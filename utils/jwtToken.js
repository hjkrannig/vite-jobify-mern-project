import jwt from 'jsonwebtoken'

const createJWT = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES
	})
}

export const getJWTtoken = (user) => {
	return createJWT({
		userId: user._id,
		userRole: user.role,
		userName: user.name
	})
}

export const verifyJWTtoken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}
