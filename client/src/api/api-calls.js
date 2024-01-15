import { toast } from 'react-toastify'
import routes from '../utils/routes'
import customFetch from '../api/customFetch'



export const logoutApi = async ({ navigate }) => {
  try {
    await customFetch.get('/auth/logout')
    navigate(routes.home)
    toast.success('Successfully logged out...')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
		console.log(error)
    navigate(routes.home)
		return error    
  }
}

export const loginDemoUser = async ({ navigate }) => {
	const	data = {
		"email": "test@test.com",
		"password": "secret123",
	}
	try {
		await customFetch.post('/auth/login', data)
		toast.success('Take a test drive...')
		// redirect only works in actions...
		navigate(routes.dashboard)
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		console.log(error)
		return error
	}
}
