import { JobsContainer, SearchContainer } from '../components'
import { useLoaderData } from 'react-router-dom'

import { AllJobsContext } from '../hooks/context'

const AllJobs = () => {
	const data = useLoaderData() // coming from loader

	return (
		<AllJobsContext.Provider value={data}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	)
}
export default AllJobs
