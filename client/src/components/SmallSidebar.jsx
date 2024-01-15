import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import Logo from './Logo'
import { useDashboardContext } from '../hooks/context'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext()

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'show-sidebar sidebar-container' : 'sidebar-container'
				}>
				<div className='content'>
					<button type='button' className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	)
}
export default SmallSidebar
