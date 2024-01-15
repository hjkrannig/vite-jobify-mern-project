import { StatusCodes } from 'http-status-codes'

import User from '../models/UserModel.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import {
	modifyRequestBody,
	comparePassword
} from '../utils/checkUserRequest.js'
import { getJWTtoken } from '../utils/jwtToken.js'
import { TIMES, TOKEN } from '../utils/constants.js'

/** Register a new user. Sets the password-hash in db */
export const register = async (req, res) => {
	req.body = await modifyRequestBody(req.body)
	const user = await User.create(req.body)
	res.status(StatusCodes.CREATED).json({ msg: 'new user created' })
}

/** User login to create a cookie to be send with every request */
export const login = async (req, res) => {
	const errmsg = 'invalid credentials'
	const user = await User.findOne({ email: req.body.email })
	if (!user || !(await comparePassword(req.body.password, user.password))) {
		throw new UnauthenticatedError(errmsg)
	}
	// Set cookie httpOnly= Not readable for js, secure= only via https
	const token = getJWTtoken(user)
	res.cookie(TOKEN.LOGIN_TOKEN, token, {
		secure: process.env.NODE_ENV === 'product',
		httpOnly: true,
		expires: new Date(Date.now() + TIMES.ONE_DAY),
	})
	res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}

/** User Logout. Removes the request-auth-cookie */
export const logout = async (req, res) => {
	res.cookie(TOKEN.LOGIN_TOKEN, TOKEN.LOGOUT_MSG, {
		httpOnly: true,
		expires: new Date(Date.now())
	})
	res.status(StatusCodes.OK).json({ msg: TOKEN.LOGOUT_MSG })
}
