import { Router } from 'express'

import { login, logout, register } from '../controllers/authController.js'
import {
	validateRegisterInput,
	validateLoginInput
} from '../middleware/validationMiddleware.js'
import { LogOutput } from 'concurrently'

const router = Router()

// Register User
router.post('/register', validateRegisterInput, register)

// Login User
router.post('/login', validateLoginInput, login)

// Loqout User
router.get('/logout', logout)

export default router
