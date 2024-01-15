import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../hooks/context'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
	const data = useAllJobsContext()
	const { jobs, pagination } = data
	// console.log(pagination)
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		)
	}
	return (
		<Wrapper>
			<h5>
				{pagination.total} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />
				})}
			</div>
			{pagination.pages > 1 && <PageBtnContainer />}
		</Wrapper>
	)
}
export default JobsContainer
