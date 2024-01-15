import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import day from 'dayjs'

import { USER_ROLE } from '../utils/constants.js'

import { getGetJobsQSM, getPagination } from './controller_utils.js'

export const getJobs = async (req, res) => {
	const { queryParams, sortKey, msg } = getGetJobsQSM(req)
	const totalJobs = await Job.find(queryParams).count()
	const pagination = getPagination(req, totalJobs)
	const { per_page:limit, offset:skip } = pagination
	const jobs = await Job.find(queryParams)
		.sort(sortKey)
		.skip(skip)
		.limit(limit)
	res.status(StatusCodes.OK).json({ msg, pagination, jobs })
}

export const getJob = async (req, res) => {
	const job = await Job.findById(req.params.id)
	res.status(StatusCodes.OK).json({ msg: 'job found', job })
}

export const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId
	console.log(req.body)
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ msg: 'new job created', job })
}

export const updateJob = async (req, res) => {
	const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})
	res.status(StatusCodes.OK).json({ msg: 'job modified', job })
}

export const deleteJob = async (req, res) => {
	const job = await Job.findByIdAndDelete(req.params.id)
	res.status(StatusCodes.OK).json({ msg: 'job deleted', job })
}

export const showStats = async (req, res) => {
	// stats from mongo.aggregate and then
	// .reduce will be an Object like defaultStats!
	let stats = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$jobStatus', count: { $sum: 1 } } }
	])
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr
		acc[title] = count
		return acc
	}, {})
	stats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0
	}
	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: {
					year: { $year: '$createdAt' },
					month: { $month: '$createdAt' }
				},
				count: { $sum: 1 }
			}
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 }
	])
	monthlyApplications = monthlyApplications
		.map((elt) => {
			// const { year, month } = elt._id
			// const { count } = elt
			const {
				_id: { year, month },
				count
			} = elt
			const date = day()
				.month(month - 1)
				.year(year)
				.format('MMM YY')
			return { date, count }
		})
		.reverse()

	res.status(StatusCodes.OK).json({ stats, monthlyApplications })
}
