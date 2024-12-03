import { NavLink } from 'react-router-dom'
import '../styles/authNav.scss'

export function AuthNav() {
    return (
        <ul className="auth-nav">
            <li ><NavLink to="/auth/sign-in">Sign In</NavLink></li>
            <span> | </span>
            <li ><NavLink to="/auth/sign-up">Sign Up</NavLink></li>
        </ul>
    )
}