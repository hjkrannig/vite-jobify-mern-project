import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'

import { useLoaderData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/StatsContainer'

import { StatItem } from '../components'

const Admin = () => {
	const { users, jobs } = useLoaderData()
	// console.log('Admin-Page loaderData(users/jobs)', users, jobs)
	return (
		<Wrapper>
			<StatItem
				title='current users'
				count={users}
				color='#e9b949'
				bgcolor='#fcefc7'
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title='total jobs'
				count={jobs}
				color='#647acd'
				bgcolor='#e0e8f9'
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	)
}
export default Admin
