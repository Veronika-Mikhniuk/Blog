import '../styles/formButton.scss'

export function FormButton({ children, onClick, type = 'button', color = 'primary', size = 'large' }) {
    const buttonClass = `
        form__button 
        form__button_${size} 
        form__button_${color}
    `.trim()

    return (
        <button className={buttonClass} onClick={onClick} type={type} >
            {children}
        </button >
    )
}