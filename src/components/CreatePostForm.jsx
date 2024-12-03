import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { FormWrapper } from './FormWrapper.jsx'
import { FormField } from './FormField.jsx'
import { ImageUploader } from './ImageUploader.jsx'
import { FormButton } from './FormButton.jsx'
import { fetchCreatePost } from '../redux/posts-slice.js'

export function CreatePostForm(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [resetImage, setResetImage] = useState(false)
    const formRef = useRef(null)

    const onSubmit = () => {
        const formData = new FormData(formRef.current)
        dispatch(fetchCreatePost(formData))
        reset()
        setResetImage(!resetImage)
    }

    const handleCancelCreatePost = () => {
        navigate('/posts/all/1')
    }

    return (
        <FormWrapper >
            <form ref={formRef} className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <FormField
                        {...register('title', { required: true })}
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        {...register('lesson_num', { required: true })}
                        name="lesson_num"
                        label="Lesson number"
                        type="number"
                        placeholder="Enter lesson number"
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        {...register('description', { required: true })}
                        name="description"
                        label="Description"
                        type="textarea"
                        textareaHeight="100px"
                        placeholder="Enter description"
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        {...register('text', { required: true })}
                        name="text"
                        label="Text"
                        type="textarea"
                        textareaHeight="150px"
                        placeholder="Enter text"
                    />
                </div>

                <div className="mb-5">
                    <ImageUploader
                        {...register('image', { required: true })}
                        name="image"
                        label="Image"
                        onReset={resetImage}
                    />
                </div>

                <div className="d-flex gap-3 justify-content-end">
                    <FormButton color="secondary" size="small" onClick={handleCancelCreatePost}>Cancel</FormButton>
                    <FormButton type="submit" color="primary" size="small">Add post</FormButton>
                </div>
            </form>
        </FormWrapper >
    )
}