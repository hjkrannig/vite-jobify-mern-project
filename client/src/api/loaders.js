import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from '../utils/routes'
import customFetch from './customFetch'

export const dashboardLoader = async () => {
	try {
		const { data } = await customFetch.get('/user/current-user')
		return data
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return redirect(routes.home)
	}
}

export const allJobsLoader = async ({ request }) => {
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries()
	])
	try {
		const { data } = await customFetch.get('/job', { params })
		return { ...data, search_params: params }
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return redirect(routes.home)
	}
}

export const editJobLoader = async ({ params }) => {
	// console.log('editJobLoader params: ', params)
	try {
		const { data } = await customFetch.get(`/job/${params.id}`)
		return data
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return redirect(routes.alljobs)
	}
}

export const adminLoader = async () => {
	try {
		const { data } = await customFetch.get('/user/admin/app-stats')
		// console.log(data);
		return data
	} catch (error) {
		toast.error('You are not authorized to access this page...')
		console.log(error)
		return redirect(routes.alljobs)
	}
}
export const statsLoader = async () => {
	try {
		const { data } = await customFetch.get('/job/stats')
		console.log(data)
		return data
	} catch (error) {
		toast.error('You are not authorized to access this page...')
		console.log(error)
		return redirect(routes.alljobs)
	}
}
