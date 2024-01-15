import { Router } from 'express'

import {
	getApplicationStats,
	getCurrentUser,
	updateUser
} from '../controllers/userController.js'
import {
	authPermissions,
	checkForTestUser
} from '../middleware/authMiddleware.js'

import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'

import upload from '../middleware/multerMiddleware.js'

import { USER_ROLE } from '../utils/constants.js'

const router = Router()

/** Current User */
router.get('/current-user', getCurrentUser)

/** Application Stats */
router.get('/admin/app-stats', [
	authPermissions(USER_ROLE.ADMIN),
	getApplicationStats
])

/** Update User */
router.patch(
	'/update-user',
	checkForTestUser,
	upload.single('avatar'),
	validateUpdateUserInput,
	updateUser
)

export default router
