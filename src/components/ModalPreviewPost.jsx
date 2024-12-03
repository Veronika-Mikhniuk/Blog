import { Modal } from './Modal.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { hidePreviewModal, resetPreviewData } from '../redux/preview-post-slice.js'

export function ModalPreviewPost() {
    const { isShownModal, data: post } = useSelector(state => state.previewPost)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hidePreviewModal())
        dispatch(resetPreviewData())
    }

    return (
        <Modal title="Preview post" isShown={isShownModal} onClose={handleClose}>
            <div className="article">
                <p className="article__date">{post.date}</p>
                <p className="article__title">{post.title}</p>
                <p className="article__text">{post.text}</p>
            </div>
        </Modal>
    )
}