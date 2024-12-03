import { forwardRef, useState } from 'react'
import { icons } from '../assets/icons'

import '../styles/formField.scss'

export const FormField = forwardRef((props, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const renderLabel = () => {
        if (!props.label) return null

        return (
            <label className="form-label" htmlFor={props.name}>{props.label}</label>
        )
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const renderFormField = () => {
        if (props.type === 'textarea') {
            return <textarea
                ref={ref}
                className="form-control"
                style={{ height: props.textareaHeight }}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder} />
        }

        const inputType = props.type === 'password' && isPasswordVisible ? 'text' : props.type
        return <input
            ref={ref}
            className="form-control"
            type={inputType}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            id={props.name}
            placeholder={props.placeholder} />
    }

    return (
        <>
            {renderLabel()}
            <div style={{ position: 'relative', width: '100%' }}>
                {renderFormField()}
                {props.type === 'password' && ( // conditional rendering
                    <img
                        src={isPasswordVisible ? icons.password.show : icons.password.hide}
                        alt="eye"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            width: '18px',
                            height: '18px',
                            right: '12px',
                            top: '58%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                )}
            </div>
        </>
    )
})