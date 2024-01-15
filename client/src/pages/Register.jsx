import { Form, useNavigation, Link } from 'react-router-dom'
import routes from '../utils/routes'
import { Logo, FormRow, SubmitButton } from '../components'
// import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { SanitizersImpl } from 'express-validator/src/chain'

const Register = () => {
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Register Page</h4>
				<p>
					Already a member?
					<Link to={routes.login} className='member-btn'>
						Login
					</Link>
				</p>
				<FormRow type='text' name='name' />
				<FormRow type='text' name='lastName' />
				<FormRow type='text' name='location' />
				<FormRow type='email' name='email' />
				<FormRow type='password' name='password' />
				<SubmitButton />
			</Form>
		</Wrapper>
	)
}
export default Register
