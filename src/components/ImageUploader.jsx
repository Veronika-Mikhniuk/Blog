import { forwardRef, useState } from 'react'
import { useEffect } from 'react'

export const ImageUploader = forwardRef(({ name, label, placeholder, onChange, onReset }, ref) => {
    const [imageUrl, setImageUrl] = useState('')

    const renderLabel = () => {
        if (!label) return null

        return (
            <label className="form-label" htmlFor={name}>{label}</label>
        )
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
            onChange(event)
        } else {
            setImageUrl('')
        }
    }

    useEffect(() => {
        setImageUrl('') // Reset image url when changing onReset
    }, [onReset]) //(comes from parent - createPostForm)

    return (
        <>
            {renderLabel()}
            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    ref={ref}
                    className="form-control"
                    type="file"
                    onChange={handleChangeImage}
                    name={name}
                    id={name}
                    placeholder={placeholder} />
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt=""
                        className="img-fluid mt-2"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                )}
            </div>
        </>
    )
})