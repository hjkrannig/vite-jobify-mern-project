export function getGetJobsQSM(req) {
	/**
	 * calculates the query, sortKey and response
	 * Message for getJobs.controller-func
	 * */
	const { search, jobType, jobStatus, sort } = req.query

	const queryParams = {
		createdBy: req.user.userId
	}

	if (search) {
		queryParams.$or = [
			{ position: { $regex: search, $options: 'i' } },
			{ company: { $regex: search, $options: 'i' } }
		]
	}

	if (jobStatus && jobStatus !== 'all') {
		queryParams.jobStatus = jobStatus
	}

	if (jobType && jobType !== 'all') {
		queryParams.jobType = jobType
	}

	const sortOptions = {
		newest: '-createdAt',
		oldest: 'createdAt',
		'a-z': 'position',
		'z-a': '-position'
	}

	const sortKey = sortOptions[sort] || sortOptions.newest

	const msg = `jobs found for  ${req.user.userName}`

	return { queryParams, sortKey, msg }
}

export function getPagination(req, total) {
	const DEFAULT_LIMIT = 6
	const page = Number(req.query.page) || 1
	const per_page = Number(req.query.per_page) || DEFAULT_LIMIT
	const offset = (page - 1) * per_page
	const pages = Math.ceil(total / per_page)
	return { page, pages, per_page, offset, total }
}
