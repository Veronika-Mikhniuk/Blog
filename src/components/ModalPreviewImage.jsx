import { Modal } from './Modal.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { hidePreviewImage } from '../redux/preview-image-slice.js'

export function ModalPreviewImage() {
    const { isShownImage, data: post } = useSelector(state => state.previewImage)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hidePreviewImage())
    }

    return (
        <Modal title="Preview Image" isShown={isShownImage} onClose={handleClose}>
            <img src={post.img} alt="1" style={{maxHeight: '500px', maxWidth: '400px'}}/>
        </Modal>
    )
}