import {
	Outlet,
	useLoaderData,
	useNavigate,
	useNavigation
} from 'react-router-dom'
import { useState } from 'react'
import Wrapper from '../assets/wrappers/Dashboard'

import { SmallSidebar, BigSidebar, Navbar, Loading } from '../components'
import { checkDarkTheme } from '../utils/helpers'
import { DashboardContext } from '../hooks/context'
import { logoutApi } from '../api/api-calls'

// ausgelagert nach hooks.context.js
// const DashboardContext = createContext()

// eslint-disable-next-line react/prop-types
const DashboardLayout = () => {
	const { user } = useLoaderData() // actions.dashboardLoader
	const navigate = useNavigate()
	const navigation = useNavigation()
	const isPageLoading = navigation.state === 'loading'
	const [showSidebar, setShowSidebar] = useState(false)
	const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme())

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme
		setIsDarkTheme(newDarkTheme)
		document.body.classList.toggle('dark-theme', newDarkTheme)
		localStorage.setItem('IsDarkTheme', newDarkTheme)
	}

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar)
	}

	const logoutUser = async () => {
		logoutApi({ navigate })
	}

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser
			}}>
			<Wrapper>
				<main className='dashboard'>
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className='dashboard-page'>
							{/* context provides user to all subpages */}
							{isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	)
}
// ausgelagert nach hooks.context.js, da in vite jede component nur einen default export haben soll!
// export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
