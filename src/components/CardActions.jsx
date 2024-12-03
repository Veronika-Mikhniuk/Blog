import { useDispatch, useSelector } from 'react-redux'
import { like, dislike, setFavourite } from '../redux/posts-slice'
import { icons } from '../assets/icons'

import '../styles/cardActions.scss'

export function CardActions({ id, likes, dislikes }) {
    const dispatch = useDispatch()
    const { list: allPosts, myList: myPosts } = useSelector(state => state.posts)
    const post = allPosts.find(post => post.id === id) || myPosts.find(post => post.id === id)

    if (!post) return null

    const likeIcon = post.likes > 0 ? icons.like.active : icons.like.default
    const dislikeIcon = post.dislikes > 0 ? icons.dislike.active : icons.dislike.default
    const favouriteIcon = post.isFavourite ? icons.bookmark.active : icons.bookmark.default

    const handleClickLike = () => {
        dispatch(like(id))
    }

    const handleClickDislike = () => {
        dispatch(dislike(id))
    }

    const handleClickFavourite = () => {
        dispatch(setFavourite(id))
    }

    return (
        <div className="card__actions d-flex justify-content-between">
            <div className="card__rating d-flex gap-4">
                <div className="card__likes d-flex gap-2" onClick={handleClickLike}>
                    <img src={likeIcon} alt="Thumbs-Up" />
                    <p className="mb-0" >{likes}</p>
                </div>
                <div className="card__dislikes d-flex gap-2" onClick={handleClickDislike}>
                    <img src={dislikeIcon} alt="Thumbs-Down" />
                    <p className="mb-0">{dislikes}</p>
                </div>
            </div>
            <div className="card__tools d-flex gap-4">
                <img src={favouriteIcon} alt="Thumbs-Up" onClick={handleClickFavourite} />
                <img src={icons.menu} alt="Thumbs-Up" />
            </div>
        </div>
    )
}