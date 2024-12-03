import { Link } from 'react-router-dom'
import { getInitials } from '../utils/getInitials'
import '../styles/user.scss'

export function User({ username }: { username: string }) {
    const initials: string = username ? getInitials(username) : 'U'

    return (
        <Link to={"/profile"}>
            <div className="user">
                <div className="user__initials">
                    <span>{initials}</span>
                </div>
                <p className="user__name">{username || "User"}</p>
            </div>
        </Link>
    )
}