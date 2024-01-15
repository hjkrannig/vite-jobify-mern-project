import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'

// eslint-disable-next-line react/prop-types
const StatsContainer = ({ data }) => {
  // generating the StatItem-Components
	const stats = [
		{
			title: 'pending applications',
			count: data?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#f59e0b',
			bgcolor: '#fef3c7'
		},
		{
			title: 'interviews scheduled',
			count: data?.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bgcolor: '#e0e8f9'
		},
		{
			title: 'jobs declined',
			count: data?.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bgcolor: '#ffeeee'
		},
	]
  console.log("Stats-Container: ", stats);
	return (
		<Wrapper>
			{stats.map((elt) => {
				return <StatItem key={elt.title} {...elt} />
			})}
		</Wrapper>
	)
}
export default StatsContainer
