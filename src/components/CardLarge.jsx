import { useDispatch } from 'react-redux'
import { showPreviewModal, setPreviewData } from '../redux/preview-post-slice.js'
import { showPreviewImage } from '../redux/preview-image-slice.js'
import { CardActions } from './CardActions.jsx'
import { Link } from 'react-router-dom'

import '../styles/cards.scss'

export function CardLarge(props) {
    const dispatch = useDispatch()

    const handleClickButtonPreview = () => {
        dispatch(setPreviewData(props))
        dispatch(showPreviewModal())
    }

    const handleClickImagePreview = () => {
        dispatch(showPreviewImage(props))
    }

    return (
        <div className="card card_large">
            <div className="card__body card__body_large">
                <div className="card__content">
                    <p className="card__date">{props.date}</p>
                    <h2 className="card__title card__title_large">{props.title}</h2>
                    <p className="card__text">{props.text}</p>
                </div>
                <div className="card__image" onClick={handleClickImagePreview}>
                    <img src={props.img} alt="1" className="card__image_large" />
                </div>
            </div>
            <div className="d-flex flex-column">
                    <Link to={`/posts/${props.id}`}>Read more ...</Link>
                    {/* <button type="button" className="btn" onClick={handleClickButtonPreview}>Preview...</button> TODO: Change UI */}
                </div>
            <CardActions id={props.id} likes={props.likes} dislikes={props.dislikes} />
            <div className="card__devider"></div>
        </div>
    )
}