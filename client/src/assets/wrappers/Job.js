import styled from 'styled-components'

const Wrapper = styled.article`
	background: var(--background-secondary-color);
	border-radius: var(--border-radius);
	display: grid;
	grid-template-rows: 1fr auto;
	box-shadow: var(--shadow-2);
	justify-items: center;
	header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--grey-100);
		display: grid;
		grid-template-columns: auto 1fr;
	}
	.main-icon {
		width: 4.5rem;
		height: 4.5rem;
		display: grid;
		place-items: center;
		background: var(--primary-500);
		border-radius: var(--border-radius);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--white);
		margin-right: 2rem;
	}
	.info {
		h5 {
			margin-bottom: 0.5rem;
		}
		p {
			margin: 0;
			text-transform: capitalize;
			letter-spacing: var(--letter-spacing);
			color: var(--text-secondary-color);
		}
	}
	.content {
		padding: 1rem 1.5rem;
	}
	.content-center {
		display: grid;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		grid-template-columns: 1fr;
		row-gap: 1.3rem;
		justify-items: center;
	}
	.status {
		border-radius: var(--border-radius);
		text-transform: capitalize;
		letter-spacing: var(--letter-spacing);
		text-align: center;
		width: 100px;
		height: 30px;
		display: grid;
		align-items: center;
	}
	.actions {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.edit-btn,
	.delete-btn {
		height: 30px;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
	}
	.edit-btn {
		margin-right: 0.5rem;
	}
	@media (min-width: 576px) {
		justify-items: left;
		.content-center {
			grid-template-columns: 1fr 1fr;
			justify-items: left;
		}
		.actions {
			justify-content: left;
		}
	}
`

export default Wrapper
