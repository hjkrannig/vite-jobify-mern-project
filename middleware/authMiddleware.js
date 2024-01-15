import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError
} from '../errors/customErrors.js'
import { verifyJWTtoken } from '../utils/jwtToken.js'

export const authenticateUser = (req, res, next) => {
	const errormsg = 'authentication invalid'
	const { user_token } = req.cookies
	if (!user_token) {
		throw new UnauthenticatedError(errormsg)
	}
	try {
		const { userId, userRole, userName } = verifyJWTtoken(user_token)
		const testUser = userName === 'Chuckleberry'
		req.user = { userId, userRole, userName, testUser }
		next()
	} catch (error) {
		throw new UnauthenticatedError(errormsg)
	}
}

// Permissions
export const authPermissions = (...roles) => {
	const errormsg = 'No authorization for this route!'
	return (req, res, next) => {
		if (!roles.includes(req.user.userRole)) {
			throw new UnauthorizedError(errormsg)
		}
		next()
	}
}

export const checkForTestUser = (req, res, next) => {
	if (req.user.testUser) {
		throw new BadRequestError('Demo User...Read Only')
	}
	next()
}
