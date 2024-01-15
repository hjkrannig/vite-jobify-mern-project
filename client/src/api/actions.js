import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from '../utils/routes'
import customFetch from './customFetch'

/**
 * Actions or Loaders are imported from react-router in
 * App.jsx. They are used and defined directly under
 * the page-component, they belong to.
 * The page typically a page with with a <form> must
 * replace the <form> with <Form method='post'>,
 * coming from react-router-dom.
 *
 * Importing and using the useActionData from react-router
 * in the bounded page makes the data from the action available
 * s.loginAction=>errors e.g. when password < 6chr, there will be an
 * error-msg.
 * with this technique
 */
export const registerAction = async ({ request }) => {
	// MUST return a/any value
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/auth/register', data)
		toast.success('Registragion sucessfull...')
		// redirect only works in actions...
		return redirect(routes.login)
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}

export const loginAction = async ({ request }) => {
	// MUST return a/any value
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	// playing with actionData...
	const errors = { msg: '' }
	if (data.password.length < 6) {
		errors.msg = 'password too short'
		return errors
	}
	try {
		await customFetch.post('/auth/login', data)
		toast.success('Login sucessfull...')
		// redirect only works in actions...
		return redirect(routes.dashboard)
	} catch (error) {
		// using actionData to make data from
		// request available
		// errors.msg=error?.response?.data?.msg
		// return errors
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}

export const createJobAction = async ({ request }) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/job', data)
		toast.success('Job sucessfully created...')
		return redirect(routes.alljobs)
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}

export const editJobAction = async ({ request, params }) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.patch(`/job/${params.id}`, data)
		toast.success('Job sucessfully updated...')
		return redirect(routes.alljobs)
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}

export const deleteJobAction = async ({ params }) => {
	try {
		await customFetch.delete(`/job/${params.id}`)
		toast.success('Job sucessfully deleted...')
		return redirect(routes.alljobs)
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}

export const profileAction = async ({ request }) => {
	const formData = await request.formData()
	const file = formData.get('avatar')
	if (file && file.size > 5 * 1000 * 1000) {
		toast.error('Image size too large!')
		return null
	}
	try {
		await customFetch.patch(`/user/update-user`, formData)
		toast.success('Profile sucessfully updated...')
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
	}
	return null
}

// export const dashboardLoader = async () => {
// 	try {
// 		const { data } = await customFetch.get('/user/current-user')
// 		return data
// 	} catch (error) {
// 		toast.error(error?.response?.data?.msg)
// 		console.log(error)
// 		return redirect(routes.home)
// 	}
// }
// export const allJobsLoader = async () => {
// 	try {
// 		const { data } = await customFetch.get('/job')
// 		return data
// 	} catch (error) {
// 		toast.error(error?.response?.data?.msg)
// 		console.log(error)
// 		return redirect(routes.home)
// 	}
// }

// export const editJobLoader = async ({ params }) => {
// 	// console.log('editJobLoader params: ', params)
// 	try {
// 		const { data } = await customFetch.get(`/job/${params.id}`)
// 		return data
// 	} catch (error) {
// 		toast.error(error?.response?.data?.msg)
// 		console.log(error)
// 		return redirect(routes.alljobs)
// 	}
// }

// export const adminLoader = async () => {
// 	try {
// 		const { data } = await
// 		customFetch.get('/user/admin/app-stats')
// 		// console.log(data);
// 		return data
// 	} catch (error) {
// 		toast.error('You are not authorized to access this page...')
// 		console.log(error)
// 		return redirect(routes.alljobs)
// 	}
// }
