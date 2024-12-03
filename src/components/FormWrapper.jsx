import React from 'react'
import '../styles/formWrapper.scss'

export function FormWrapper({children}) {
    return (
        <div className="form-wrapper">{children}</div>
    )
}