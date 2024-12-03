import { EmailConfirmMessage } from '../components/EmailConfirmMessage.jsx'
import { useSelector } from 'react-redux'

export function SignUpConfirm() {
    const userEmail = useSelector(state => state.auth.userEmail)

    return (
        <>
            <h1>Registration Confirmation</h1>
            <EmailConfirmMessage email={userEmail} />
        </>
    )

}