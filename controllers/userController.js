import { StatusCodes } from 'http-status-codes'
import cloudinary from 'cloudinary'

import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import { formatImage } from '../middleware/multerMiddleware.js'
export const getCurrentUser = async (req, res) => {
	const msg = 'current user'
	const _id = req.user.userId
	const user = await User.findOne({ _id })
	res.status(StatusCodes.OK).json({ msg, user: user?.toJson() })
}

export const getApplicationStats = async (req, res) => {
	/** Todo:
	 * should go to adminRoutes together with a
	 * getAllUsers()-route
	 */
	const users = await User.countDocuments()
	const jobs = await Job.countDocuments()
	const msg = 'application stats'
	res.status(StatusCodes.OK).json({ msg, users, jobs })
}

export const updateUser = async (req, res) => {
	/** only for updating users own profile without psw
	 * Todo:
	 * password-changing should be enabled.
	 * Updating user for admin should be enabled in adminRoutes
	 */
	const user_obj = { ...req.body }
	delete user_obj._id // never ever allowed to change!!!
	delete user_obj.password // needs check and hashing
	delete user_obj.role // only admin is allowed to
	// delete user_obj.email // only when validation-check is implemented

	// Avatar-File-Upload to cloudinary
	// console.log(req.file)
	if (req.file) {
		const file = formatImage(req.file)
		const response = await cloudinary.v2.uploader.upload(file)
		user_obj.avatar = response.secure_url
		user_obj.avatarPublicId = response.public_id
	}

	const updatedUser = await User.findByIdAndUpdate(req.user.userId, user_obj)

	if (req.file && updatedUser.avatarPublicId) {
		await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
	}
	res.status(StatusCodes.OK).json({ msg: 'user successfully updated ' })
}
