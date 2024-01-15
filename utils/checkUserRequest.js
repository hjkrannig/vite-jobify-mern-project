import bcrypt from 'bcryptjs'

import User from '../models/UserModel.js'

const isFirstAccount = async () => {
	return (await User.countDocuments()) === 0
}

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const modifyRequestBody = async (body) => {
	body.role = (await isFirstAccount()) ? 'admin' : 'user'
	body.password = await hashPassword(body.password)
	return body
}

export const comparePassword = async (password, hasshedPassword) => {
	return await bcrypt.compare(password, hasshedPassword)
}
