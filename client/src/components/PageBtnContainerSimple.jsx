import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../hooks/context'

// eslint-disable-next-line react/prop-types
const PageBtnContainer = () => {
	const { search, pathname } = useLocation()
	const navigate = useNavigate()
	const searchParams = new URLSearchParams(search)
	const {pagination: { page, pages }} = useAllJobsContext()
	const pageBtns = 
		Array.from({ length: pages }, (_, index) => index + 1)

	const handlePageChange = (page) => {
		let pageDesired = page
		if (page < 1) {
			pageDesired = pages
		} else if (page > pages) {
			pageDesired = 1
		}
		searchParams.set('page', pageDesired)
		navigate(pathname + `?${searchParams.toString()}`)
	}

	return (
		<Wrapper>
			<button
				className='btn prev-btn'
				onClick={() => handlePageChange(page - 1)}>
				<HiChevronDoubleLeft /> prev
			</button>
			<div className='btn-container'>
				{pageBtns.map((pageIndex) => {
					return (
						<button
							className={`btn page-btn 
              ${pageIndex === page && 'active'}`}
							key={pageIndex}
							onClick={() => handlePageChange(pageIndex)}>
							{pageIndex}
						</button>
					)
				})}
			</div>
			<button
				className='btn next-btn'
				onClick={() => handlePageChange(page + 1)}>
				<HiChevronDoubleRight /> next
			</button>
		</Wrapper>
	)
}
export default PageBtnContainer
