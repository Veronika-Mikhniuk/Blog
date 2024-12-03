import { NavLink } from 'react-router-dom'
import { buildSchemePagination } from '../utils/buildSchemePagination'

export function Pagination({ currentPage, pageCount, url }) {
    const renderPaginationItems = () => {
        const scheme = buildSchemePagination(currentPage, pageCount)

        return scheme.map((item, index) => {
            return (
                <li className="page-item" key={index}>
                    {item == '...'
                        ? <span className="page-link">...</span>
                        : <NavLink className="page-link" to={`${url}/${item}`}>{item}</NavLink>}
                </li >
            )
        })
    }

    return (
        <nav aria-label="...">
            <ul className="pagination pagination-sm">
                {renderPaginationItems()}
            </ul>
        </nav>
    )
}