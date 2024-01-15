import styled from 'styled-components'

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	align-items: center;
	.logo {
		display: block;
		margin-bottom: 1.4rem;
	}
	.form {
		max-width: 500px;
		border-top: 5px solid var(--primary-500);
	}
	h4 {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	p {
		font-size: 0.8rem;
		margin-top: 1rem;
		text-align: center;
		line-height: 1.5;
	}
	.btn {
		margin-top: 1rem;
	}
	.btn-explore {
		background: var(--primary-700);
	}
	.member-btn {
		color: var(--primary-500);
		letter-spacing: var(--letter-spacing);
		margin-left: 0.4rem;
	}
`
export default Wrapper
