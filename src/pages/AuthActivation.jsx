import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchAuthActivation } from '../redux/auth-slice'

export function AuthActivation() {
    const { activationError, isActivated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { uid, token } = useParams()

    useEffect(() => {
        dispatch(fetchAuthActivation({ uid, token }))
    }, [uid, token, dispatch])

    useEffect(() => {
        if (isActivated) {
            navigate('/auth/sign-up-success')
        }
    }, [isActivated, navigate])

    if (activationError) {
        return <div className="error">Activation failed: {activationError}</div>
    }

    return <h2>Activation in progress...</h2>
}