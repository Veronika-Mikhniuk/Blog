import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { texts } from '../config/texts'
import { fetchSignIn } from '../redux/auth-slice.js'
import { fetchProfile } from '../redux/auth-slice.js'
import { FormWrapper } from './FormWrapper.jsx'
import { FormField } from './FormField.jsx'
import { FormButton } from './FormButton.jsx'

export function SignInForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nameInputRef = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const lang = useSelector(state => state.lang.value)
    const { jwt, signInError } = useSelector(state => state.auth)

    useEffect(() => {
        setTimeout(() => {
            nameInputRef.current.focus()
        }, 50)
    }, [])

    const handleChangeEmail = ({ target }) => setEmail(target.value)
    const handleChangePassword = ({ target }) => setPassword(target.value)

    const handleSubmit = (event) => {
        event.preventDefault()

        const body = {
            email,
            password
        }

        dispatch(fetchSignIn(body))
    }

    useEffect(() => {
        if (jwt?.access) {
            navigate('/posts/all/1')

            setEmail('')
            setPassword('')

            dispatch(fetchProfile())
        }
    }, [jwt, navigate])

    return (
        <FormWrapper >
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <FormField
                        ref={nameInputRef}
                        name="email"
                        label={texts[lang].signIn.email.label}
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder={texts[lang].signIn.email.placeholder} />
                </div>

                <div className="mb-5">
                    <FormField
                        name="password"
                        label={texts[lang].signIn.password.label}
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder={texts[lang].signIn.password.placeholder} />
                </div>

                <div style={{ margin: '-40px 0 20px' }}>
                    {signInError && (
                        <div style={{ color: 'red' }}>
                            {signInError}
                        </div>
                    )}

                    <p className="form__forgot-password">
                        <a href="/forgot-password">{texts[lang].signIn.forgotPassword}</a>
                    </p>
                </div>

                <FormButton type="submit">{texts[lang].signIn.submit}</FormButton>
                <p className="form__footer" style={{ textAlign: 'center' }}>
                    {texts[lang].signIn.haveAccount} <a href="/login">{texts[lang].signIn.signUp}</a>
                </p>
            </form>
        </FormWrapper >
    )
}