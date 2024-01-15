import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import error_404 from '../assets/images/not-found.svg'
import error_default from '../assets/images/default-error.svg'
import routes from '../utils/routes'

const Error = () => {
	const error = useRouteError()
	let img = error_404
	let title = 'ohh! page not found'
	let text = "we can't seem to find the page you are looking for..."
	// console.log('error: ', error)
	if (!(error.status === 404)) {
		img = error_default
		title = 'sorry! something went wrong'
		text = 'we got an undefined error. Please contact your Admin..'
	}
	return (
		<Wrapper>
			<div>
				<img src={img} alt='default error' />
				<h3>{title}</h3>
				<p>{text}</p>
				<Link to={routes.dashboard}>back home</Link>
			</div>
		</Wrapper>
	)
}
export default Error
