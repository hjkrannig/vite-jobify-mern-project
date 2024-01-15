import { Link } from 'react-router-dom'
// import Wrapper from '../assets/wrappers/LandingPage'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import routes from '../utils/routes'
import { Logo } from '../components'
const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ea
						dignissimos voluptates quidem necessitatibus iure nihil sunt eos
						debitis. Molestias voluptatibus tenetur neque, fuga porro officia!
						Architecto, tenetur non! Sint.
					</p>
					<Link to={routes.register} className='btn register-link'>
						register
					</Link>
					<Link to={routes.login} className='btn'>
						login
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	)
}
export default Landing
