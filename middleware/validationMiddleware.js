import { body, param, validationResult } from 'express-validator'
import mongoose from 'mongoose'

import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError
} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from '../utils/constants.js'
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'

// error-selection in validator() on this error-msg
const NO_JOB_FOUND = 'no job found with id'
const NO_AUTHORIZATION = 'not authorized to access this job'

// **************** START Validation Logik **************************
const validator = (req, res, next) => {
	/** does the validation for the given validation queries  */
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg)
		if (errorMessages[0].startsWith(NO_JOB_FOUND)) {
			throw new NotFoundError(errorMessages)
		} else if (errorMessages[0].startsWith(NO_AUTHORIZATION)) {
			throw new UnauthorizedError(errorMessages)
		} else {
			throw new BadRequestError(errorMessages)
		}
	}
	next()
}

const withValidationErrors = (validateValues) => {
	/** provides the validation-values to the validator returns next()
	 * with the validated values or an error */
	return [validateValues, validator]
}
// **************** END Validation Logik **************************

/**  *********** Test-Validation******************* */
// only for test-purposes on test-route /api/v1/test
// only for testRoute. Not used yet
export const validateTest = withValidationErrors([
	body('name')
		.notEmpty()
		.withMessage('name is required')
		.isLength({ min: 3, max: 50 })
		.withMessage('name must be betwenn 3 and 50 characters long')
])

// *********** Job-Validation*******************
// Graps body-fields and validates the values
export const validateJobInput = withValidationErrors([
	/** returns the validation-complex-func with specific validation-query
	 *  escape() prevents XSS-attacks
	 */
	body('company').notEmpty().escape().withMessage('company is required'),
	body('position').notEmpty().escape().withMessage('position is required'),
	body('jobLocation').notEmpty().withMessage('job location is required'),
	body('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage('invalid status value'),
	body('jobType')
		.isIn(Object.values(JOB_TYPE))
		.withMessage('invalid type value')
])

/**
 * Graps parameters=>ID. Catches invalidate mongo-id NOT not found ID!!
 * Graps userRole and userId from req.user-object to identify Owner or
 * Admin. The custom()-func needs access to the request-object
 * => custom(async (value, {req}))...
 */
export const validateIdParam = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value)
		if (!isValidId) throw new Error('invalid MongoDB id')
		const job = await Job.findById(value)
		if (!job) {
			throw new Error(`${NO_JOB_FOUND}: ${value}`)
		}

		const isAdmin = req.user.userRole === USER_ROLE.ADMIN
		const isOwner = req.user.userId === job.createdBy.toString()
		console.log('isAdmin, isOwner: ', isAdmin, isOwner)
		console.log('ids: ', req.user.userId, job.createdBy.toString())
		if (!isAdmin && !isOwner) throw new Error(NO_AUTHORIZATION)
	})
])

// *********** User-Validation*******************
// User-Registration
export const validateRegisterInput = withValidationErrors([
	body('name').notEmpty().escape().withMessage('username is required'),
	body('lastName').notEmpty().escape().withMessage('lastname is required'),
	body('email')
		.notEmpty()
		.escape()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format')
		.custom(async (email) => {
			const user = await User.findOne({ email })
			if (user) {
				throw new BadRequestError('email already exists')
			}
		}),
	body('password')
		.notEmpty()
		.escape()
		.withMessage('password is required')
		.isLength({ min: 6 })
		.withMessage('password must be at least 6 characters'),
	body('location').notEmpty().escape().withMessage('location is required')
	// role 'admin' is given to the very first account from controller!
	// 	body('role').isIn(Object.values(USER_ROLE)).withMessage('invalid role value')
	//
])

// User-Login
export const validateLoginInput = withValidationErrors([
	body('email')
		.notEmpty()
		.escape()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format'),

	body('password').notEmpty().escape().withMessage('password is required')
])

// User-Update
export const validateUpdateUserInput = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invalid email format')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email })
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError('email already exists')
			}
		}),
	body('location').notEmpty().withMessage('location is required'),
	body('lastName').notEmpty().withMessage('last name is required')
])
