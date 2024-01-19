import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../hooks/context'

// eslint-disable-next-line react/prop-types
const PageBtnContainer = () => {
	const { search, pathname } = useLocation()
	const navigate = useNavigate()
	const searchParams = new URLSearchParams(search)
	const {
		pagination: { page, pages }
	} = useAllJobsContext()

	const addPageBtn = ({ pageIndex, activeClass }) => {
		return (
			<button
				className={`btn page-btn 
	${activeClass && 'active'}`}
				key={pageIndex}
				onClick={() => handlePageChange(pageIndex)}>
				{pageIndex}
			</button>
		)
	}

	const renderPageButtons = () => {
		const pageButtons = []
		const STEP = Math.round(pages/5)
		// console.log(STEP)

		// first page
		pageButtons.push(addPageBtn({ pageIndex: 1, activeClass: page === 1 }))

		// before currentPage
		if (STEP>0 && page > STEP*2) {
			pageButtons.push(addPageBtn({ pageIndex: page - STEP, activeClass: false }))
		}
		// current page
		if (page !== 1 && page !== pages) {
			pageButtons.push(addPageBtn({ pageIndex: page, activeClass: true }))
		}
		// after currentPage
		if (STEP>0 && pages >= STEP*4 && page <= pages - STEP*2) {
			pageButtons.push(addPageBtn({ pageIndex: page + STEP, activeClass: false }))
		}
		// last page
		pageButtons.push(
			addPageBtn({ pageIndex: pages, activeClass: page === pages })
		)
		return pageButtons
	}

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
				{renderPageButtons()}
				{/* {pageBtns.map((pageIndex) => {
					return (
						<button
							className={`btn page-btn 
              ${pageIndex === page && 'active'}`}
							key={pageIndex}
							onClick={() => handlePageChange(pageIndex)}>
							{pageIndex}
						</button>
					)
				})} */}
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
