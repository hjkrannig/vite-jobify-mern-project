import { Link, Form, useNavigate, useActionData } from 'react-router-dom'
import routes from '../utils/routes'
import { Logo, FormRow, SubmitButton } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { loginDemoUser } from '../api/api-calls'

const Login = () => {
	// Only for show-case
	const errors = useActionData()
	const navigate = useNavigate() // to use for api-call Demo-User
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Login</h4>
				{errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
				<p>
					Not a member yet?
					<Link to={routes.register} className='member-btn'>
						Register
					</Link>
				</p>
				<FormRow type='email' name='email' />
				<FormRow type='password' name='password' />
				<SubmitButton />
				<button
					type='button'
					className='btn btn-block btn-explore'
					onClick={() => loginDemoUser({navigate})}>
					explore the app
				</button>
			</Form>
		</Wrapper>
	)
}
export default Login
