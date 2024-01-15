import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useOutletContext } from 'react-router-dom'

import { FormRow, FormRowSelect, SubmitButton } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'

const AddJob = () => {
	const { user } = useOutletContext()

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h3 className='form-title'>add job</h3>
				<div className='form-center'>
					<FormRow type='text' name='position' defaultValue='position' />
					<FormRow type='text' name='company' defaultValue='company' />
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						defaultValue={user.location}
					/>
					<FormRowSelect
						name='jobStatus'
						labelText='job status'
						defaultValue={JOB_STATUS.PENDING}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name='jobType'
						labelText='job type'
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
					/>
					<SubmitButton formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}
export default AddJob
