import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { texts } from '../config/texts'
import { fetchSignUp } from '../redux/auth-slice.js'
import { FormWrapper } from './FormWrapper.jsx'
import { FormField } from './FormField.jsx'
import { FormButton } from './FormButton.jsx'


export function SignUpForm(props) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const lang = useSelector(state => state.lang.value)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isUserRegistered } = useSelector(state => state.auth)

    const handleNameChange = ({ target }) => setUsername(target.value)
    const handleEmailChange = ({ target }) => setEmail(target.value)
    const handlePasswordChange = ({ target }) => setPassword(target.value)
    const handleConfirmPasswordChange = ({ target }) => setConfirmPassword(target.value)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('Password don\'t match')
            return
        }

        const body = {
            username,
            email,
            password
        }

        dispatch(fetchSignUp(body))
    }

    // reset form and redirecting
    useEffect(() => {
        if (isUserRegistered) {
            navigate('/auth/sign-up-confirm')

            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
    }, [isUserRegistered])

    return (
        <FormWrapper >
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <FormField
                        name="name"
                        label={texts[lang].signUp.name.label}
                        type="text"
                        value={username}
                        onChange={handleNameChange}
                        placeholder={texts[lang].signUp.name.placeholder} />
                </div>

                <div className="mb-5">
                    <FormField
                        name="email"
                        label={texts[lang].signUp.email.label}
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder={texts[lang].signUp.email.placeholder} />
                </div>

                <div className="mb-5">
                    <FormField
                        name="password"
                        label={texts[lang].signUp.password.label}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder={texts[lang].signUp.password.placeholder} />
                </div>

                <div className="mb-5" >
                    <FormField
                        name="confirmPassword"
                        label={texts[lang].signUp.confirmPassword.label}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder={texts[lang].signUp.confirmPassword.placeholder} />
                </div>

                <FormButton type="submit">{texts[lang].signUp.submit}</FormButton>
                <p className="form__footer" style={{ textAlign: 'center' }}>
                    {texts[lang].signUp.haveAccount} <a href="/login">{texts[lang].signUp.signIn}</a>
                </p>
            </form>
        </FormWrapper>
    )
}