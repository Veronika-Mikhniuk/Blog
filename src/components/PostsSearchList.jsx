import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/posts-slice'
import { useParams } from 'react-router-dom'
import { CardSmall } from './CardSmall'
import { Pagination } from './Pagination'
import { formatDate } from '../utils/formatDate'

export function PostsSearchList() {
    const { currentPage, query } = useParams()
    const dispatch = useDispatch()
    const {
        list: allPosts,
        isLoading,
        error,
        pageCount,
        ordering
    } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchPosts({ currentPage, ordering, search: query }))
    }, [currentPage, query, dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (allPosts.length == 0) {
        return <div>No posts</div>
    }

    return (
        <>
            <div className="d-flex flex-column" style={{ gap: '32px', maxWidth: '1120px', width: '100%', alignItems: 'flex-start' }}>
                {allPosts.map(post => <CardSmall
                    key={post.id}
                    date={formatDate(post.date)}
                    title={post.title}
                    img={post.image} />)}
            </div>
            <div className="nav-footer pt-3 pb-3">
                <Pagination
                    currentPage={currentPage}
                    pageCount={pageCount}
                    url={`/posts/all/search/${query}`} />
            </div>
        </>
    )
}   