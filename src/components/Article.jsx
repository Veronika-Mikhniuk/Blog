import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, unlike, dislike, undislike, setFavourite } from '../redux/posts-slice'
import { icons } from '../assets/icons'
import '../styles/article.scss'

export function Article(props) {
    const [isLikeActive, setLikeActive] = useState(false)
    const [isDislikeActive, setDislikeActive] = useState(false)

    const {list: allPosts, myList: myPosts} = useSelector(state => state.posts)
    const post = allPosts.find(post => post.id === props.id) || myPosts.find(post => post.id === props.id)
    const dispatch = useDispatch()

    const likeIcon = isLikeActive ? icons.like.active : icons.like.default
    const dislikeIcon = isDislikeActive ? icons.dislike.active : icons.dislike.default
    const favouriteIcon = post && post.isFavourite ? icons.bookmark.active : icons.bookmark.default

    const handleClickLike = () => {
        if (isLikeActive) {
            dispatch(unlike(props.id))
            setLikeActive(false)
        } else {
            dispatch(like(props.id))
            setLikeActive(true)

            if (isDislikeActive) {
                setDislikeActive(false)
                dispatch(undislike(props.id))
            }
        }   
    }

    const handleClickDislike = () => {
        if (isDislikeActive) {
            dispatch(undislike(props.id))
            setDislikeActive(false)
        } else {
            dispatch(dislike(props.id))
            setDislikeActive(true)

            if (isLikeActive) {
                setLikeActive(false)
                dispatch(unlike(props.id))
            }
        }
    }

    const handleClickFavourite = () => {
        dispatch(setFavourite(props.id))
    }

    return (
        <>
            <div className="article">
                <img src={props.image} alt="article-image" className="post__image" />
                <div className="article-content">
                    <article className="article__text">{props.text}</article>
                    <div className="article__actions">
                        <div className="article__likes">
                            <div className="article__like" onClick={handleClickLike}>
                                <img src={likeIcon} alt="Thumbs-Up" style={{ width: '22px', height: '24px' }} />
                            </div>
                            <div className="article__dislike" onClick={handleClickDislike}>
                                <img src={dislikeIcon} alt="Thumbs-Down" style={{ width: '22px', height: '24px' }} />
                            </div>
                        </div>
                        <div className="article__favourite" onClick={handleClickFavourite}>
                            <img src={favouriteIcon} alt="Thumbs-Up" style={{ width: '20px', height: '24px' }} />
                            <p className="mb-0" style={{ fontWeight: '500' }}>Add to favourites</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-footer">
                {/* TODO: Add later */}
            </div>
        </>
    )
}