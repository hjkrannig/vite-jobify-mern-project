import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './utils/routes'
import {
	HomeLayout,
	Landing,
	Register,
	Login,
	DashboardLayout,
	Error,
	AddJob,
	EditJob,
	AllJobs,
	Stats,
	Profile,
	Admin
} from './pages'
import { checkDarkTheme } from './utils/helpers'
import {
	registerAction,
	loginAction,
	createJobAction,
	editJobAction,
	deleteJobAction,
	profileAction
} from './api/actions'
import {
	dashboardLoader,
	allJobsLoader,
	editJobLoader,
	adminLoader,
	statsLoader
} from './api/loaders'

checkDarkTheme()

const router = createBrowserRouter([
	{
		path: routes.home,
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Landing /> },
			{
				path: routes.register,
				element: <Register />,
				action: registerAction
			},
			{
				path: routes.login,
				element: <Login />,
				action: loginAction
			},
			{
				path: routes.dashboard,
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{ index: true, element: <AddJob />, action: createJobAction },
					{
						path: `${routes.editJob}:id`,
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction
					},
					{
						path: `${routes.deleteJob}:id`,
						action: deleteJobAction
					},
					{
						path: routes.stats,
						element: <Stats />,
						loader: statsLoader
					},
					{
						path: routes.alljobs,
						element: <AllJobs />,
						loader: allJobsLoader
					},
					{
						path: routes.profile,
						element: <Profile />,
						action: profileAction
					},
					{
						path: routes.admin,
						element: <Admin />,
						loader: adminLoader
					}
				]
			}
		]
	}
])

function App() {
	return <RouterProvider router={router} />
}
export default App
