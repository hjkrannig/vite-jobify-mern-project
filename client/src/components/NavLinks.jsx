import links from '../utils/links'
import { useDashboardContext } from '../hooks/context'
import { NavLink } from 'react-router-dom'
import routes from '../utils/routes'

// eslint-disable-next-line react/prop-types
const NavLinks = ({ isBigSidebar }) => {
	// eslint-disable-next-line no-unused-vars
	const { toggleSidebar, user } = useDashboardContext()
	return (
		<div className='nav-links'>
			{links.map((link) => {
				const { text, path, icon } = link
				const { role } = user
				if (path === routes.admin && role !== 'admin') {
					return
				}
				return (
					<NavLink
						to={path}
						key={text}
						className='nav-link'
						onClick={isBigSidebar ? null : toggleSidebar}
						// 'end' avoids class=active on index-link
						end>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				)
			})}
		</div>
	)
}
export default NavLinks
