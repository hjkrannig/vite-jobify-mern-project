import Wrapper from '../assets/wrappers/StatItem'

const StatItem = ({ count, title, icon, color, bgcolor }) => {
	return (
		<Wrapper color={color} bcg={bgcolor}>
			<header>
				<span className='count'>{count}</span>
				<span className='icon'>{icon}</span>
			</header>
			<h5 className='title'>{title}</h5>
		</Wrapper>
	)
}
export default StatItem
