import { Outlet, NavLink, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOrdering } from '../redux/posts-slice'
import { SortSelect } from '../components/SortSelect'
import { fetchPosts } from '../redux/posts-slice'
import { SearchForm } from '../components/SearchForm.jsx'
import { ModalPreviewPost } from '../components/ModalPreviewPost.jsx'
import { ModalPreviewImage } from '../components/ModalPreviewImage.jsx'

import '../styles/posts.scss'

export function Posts(props) {
    const dispatch = useDispatch()
    const { ordering } = useSelector(state => state.posts)
    const { pathname } = useLocation()
    const { query } = useParams()

    const handleSort = (value) => {
        dispatch(setOrdering(value))
        if (pathname.includes('/search')) {
            dispatch(fetchPosts({ currentPage: 1, ordering: value, search: query }))
        } else {
            dispatch(fetchPosts({ currentPage: 1, ordering: value }))
        }
    }

    return (
        <>
            <div style={{ position: 'relative', width: '100%' }}>
                <div className="d-flex mb-5 nav nav-tabs" >
                    <NavLink
                        to="/posts/all/1"
                        className={() => pathname.includes('/posts/all') ? "nav-link active-tab" : "nav-link"} >
                        All
                    </NavLink>
                    <NavLink
                        to="/posts/favorite"
                        className={({ isActive }) => isActive ? "nav-link active-tab" : "nav-link"}>
                        Favorite
                    </NavLink>
                    <NavLink
                        to="/posts/popular"
                        className={({ isActive }) => isActive ? "nav-link active-tab" : "nav-link"}>
                        Popular
                    </NavLink>
                    <NavLink
                        to="/posts/myposts/1"
                        className={() => pathname.includes('/posts/myposts') ? "nav-link active-tab" : "nav-link"}>
                        My posts
                    </NavLink>
                </div>
                {pathname.includes('/posts/all') && <SearchForm />}
                {pathname.includes('/posts/all') && <SortSelect onChange={handleSort} value={ordering} />}
            </div>
            <Outlet />
            <ModalPreviewPost />
            <ModalPreviewImage />
        </>
    )
}