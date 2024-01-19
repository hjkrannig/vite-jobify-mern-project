import { Form, useSubmit, Link } from 'react-router-dom'

import Wrapper from '../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '.'
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants'
import { useAllJobsContext } from '../hooks/context'
import routes from '../utils/routes'

/**
 * evtFunc is the main-func to be invoked when
 * the event is triggered. The func to be called
 * when the user types is defined in return. So
 * after a user-type the timeout starts new and
 * after 2 secs evtFunc is invoked or...the
 * next type in between to seconds sets the timer
 * on start again
 *
 */
const debounce = (evtFunc) => {
	let timeout
	return (e) => {
		clearTimeout(timeout)
		const form = e.currentTarget.form
		timeout = setTimeout(() => {
			evtFunc(form)
		}, 2000)
	}
}

const SearchContainer = () => {
	const data = useAllJobsContext()
	const { search, jobStatus, jobType, sort } = data.search_params

	const submit = useSubmit()
	return (
		<Wrapper>
			<Form className='form'>
				<h5 className='form-title'>search form</h5>
				<div className='form-center'>
					<FormRow
						type='search'
						name='search'
						labelText='search in company or position...'
						defaultValue={search}
						onChange={debounce((form) => {
							submit(form)
						})}
					/>
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={(e) => submit(e.currentTarget.form)}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={jobType}
						onChange={(e) => submit(e.currentTarget.form)}
					/>
					<FormRowSelect
						name='sort'
						defaultValue={sort}
						list={[...Object.values(JOB_SORT_BY)]}
						onChange={(e) => submit(e.currentTarget.form)}
					/>
					<Link to={routes.alljobs} className='btn form-btn delete-btn'>
						reset search values
					</Link>
					{/* <SubmitButton formBtn /> */}
				</div>
			</Form>
		</Wrapper>
	)
}
export default SearchContainer
