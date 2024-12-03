import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchMyPosts } from '../redux/posts-slice'
import { useParams } from 'react-router-dom'
import { CardLarge } from './CardLarge'
import { CardMedium } from './CardMedium'
import { CardSmall } from './CardSmall'
import { Pagination } from './Pagination'
import { splitPosts } from '../utils/splitPosts'
import { formatDate } from '../utils/formatDate'

export function PostsList({ favourite, popular, myList }) {
    const { currentPage } = useParams()
    const dispatch = useDispatch()
    const {
        list: allPosts,
        myList: myPosts,
        isLoading,
        error,
        pageCount,
        ordering
    } = useSelector(state => state.posts)

    useEffect(() => {
        if (!favourite && !popular && !myList) {
            dispatch(fetchPosts({ currentPage, ordering }))
        }
        if (myList) {
            dispatch(fetchMyPosts(currentPage))
        }
    }, [myList, currentPage, dispatch])

    let postsToDisplay = myList ? myPosts : allPosts

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (postsToDisplay.length == 0) {
        return <div>No posts</div>
    }

    // Filtering posts
    if (!myList) {
        if (favourite) {
            postsToDisplay = allPosts.filter(post => post.isFavourite)
        } else if (popular) {
            postsToDisplay = allPosts.filter(post => post.rating > 5)
        }
    }

    // Splitting posts
    const { largePost, mediumPosts, smallPosts } = splitPosts(postsToDisplay)

    return (
        <>
            <div className="d-flex" style={{ gap: '32px', maxWidth: '1120px', width: '100%' }}>
                <div className="d-flex flex-column" style={{ gap: '39.5px', maxWidth: '736px', width: '100%' }} >
                    {largePost && ( // Проверка, что largePost существует, без этого ошибка, т.к изначально данные пустые
                        <div>
                            <CardLarge
                                id={largePost.id}
                                key={largePost.id}
                                title={largePost.title}
                                date={formatDate(largePost.date)}
                                text={largePost.text}
                                img={largePost.image}
                                likes={largePost.likes}
                                dislikes={largePost.dislikes}
                                rating={largePost.rating}
                            />
                        </div>
                    )}
                    <div className="d-flex" style={{ flexWrap: 'wrap', justifyContent: 'space-between', rowGap: '40px' }} >
                        {mediumPosts.map(post => (
                            <CardMedium
                                id={post.id}
                                key={post.id}
                                date={formatDate(post.date)}
                                title={post.title}
                                img={post.image}
                                likes={post.likes}
                                dislikes={post.dislikes}
                                rating={post.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ gap: '39.5px' }}>
                    {smallPosts.map(post => (
                        <CardSmall
                            id={post.id}
                            key={post.id}
                            date={formatDate(post.date)}
                            title={post.title}
                            img={post.image}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            rating={post.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="nav-footer pt-3 pb-3">
                {(!favourite && !popular) &&
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        url={myList ? '/posts/myposts' : '/posts/all'} />}
            </div>
        </>
    )
}


