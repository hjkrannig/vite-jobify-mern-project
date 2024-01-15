import { Router } from 'express'
import {
	getJob,
	getJobs,
	createJob,
	updateJob,
	deleteJob,
	showStats
} from '../controllers/jobController.js'
import {
	validateJobInput,
	validateIdParam
} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

const router = Router()

// getJobs, createJob
router
	.route('/')
	.get(getJobs)
	.post(checkForTestUser, validateJobInput, createJob)

// getStats
router.route('/stats').get(showStats)

// getJob, updateJob, deleteJob
router
	.route('/:id')
	.get(validateIdParam, getJob)
	.patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
	.delete(checkForTestUser, validateIdParam, deleteJob)
export default router
