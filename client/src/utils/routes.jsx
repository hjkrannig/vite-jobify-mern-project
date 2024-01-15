
// routes using absolute paths
const routes = {
	home: '/',
	register: '/register',
	login: '/login',
	dashboard: '/dashboard',
	landing: '/landing',
	error: '/error',
	addjob: '/dashboard',
	editJob: '/dashboard/edit-job/',
	deleteJob: '/dashboard/delete-job/',
	alljobs: '/dashboard/all-jobs',
	stats: '/dashboard/stats',
	profile: '/dashboard/profile',
	admin: '/dashboard/admin'
}

// routes using relative paths
// const routes = {
// 	home: '/',
// 	register: '/register',
// 	login: '/login',
// 	dashboard: '/dashboard',
// 	landing: '/landing',
// 	error: '/error',
// 	addjob: '.',
// 	editJob: 'edit-job',
// 	alljobs: 'all-jobs',
// 	stats: 'stats',
// 	profile: 'profile',
// 	admin: 'admin'
// }

export default routes
