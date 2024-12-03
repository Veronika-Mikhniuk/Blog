import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../redux/lang-slice'
import { NavLink } from 'react-router-dom'
import { fetchProfile } from '../redux/auth-slice'
import { Burger } from './Burger'
import { AuthNav } from './AuthNav'
import { AuthSkeleton } from './AuthSkeleton'
import { User } from './User'
import { jwt } from '../utils/jwt'

import '../styles/header.scss'

export function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isInitializing, setIsInitializing] = useState(true)
    const menuRef = useRef(null)
    const burgerRef = useRef(null)

    const dispatch = useDispatch()
    const lang = useSelector(state => state.lang.value)
    const { currentProfile } = useSelector(state => state.auth)

    useEffect(() => {
        const initializeAuth = async () => {
            const tokens = jwt.getFromLocalStorage()
            if (tokens?.access && !currentProfile) {
                try {
                    await dispatch(fetchProfile())
                } catch (error) {
                    console.error('Failed to fetch profile:', error)
                }
            }
            setIsInitializing(false)
        }

        initializeAuth()
    }, [dispatch, currentProfile])

    const handleMenuToogle = () => setIsMenuOpen(!isMenuOpen)
    const handleClickOutside = ({ target }) => {
        if (menuRef.current && !menuRef.current.contains(target) && burgerRef.current && !burgerRef.current.contains(target)) {
            setIsMenuOpen(false)
        }
    }
    const handleLinkClick = () => setIsMenuOpen(false)
    const handleChangeLang = ({ target }) => {
        dispatch(setLang(target.value))
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const renderAuthSection = () => {
        if (isInitializing) {
            return <AuthSkeleton />
        }
        if (currentProfile) {
            return <User username={currentProfile.username} />
        }
        return <AuthNav />
    }

    return (
        <header className="header" >
            <nav className="header__nav d-flex justify-content-between">
                <div className="container-fluid d-flex justify-content-between" >
                    <div className="header__burger">
                        <Burger onToggleMenu={handleMenuToogle} active={isMenuOpen} ref={burgerRef} />
                    </div>
                    <div className={`header__menu ${isMenuOpen ? 'header__menu_open' : ''}`} ref={menuRef}>
                        <ul className="header__menu-list">
                            <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
                            <li><NavLink to="/posts/all/1" onClick={handleLinkClick}>Posts</NavLink></li>
                            <li><NavLink to="add-post" onClick={handleLinkClick}>Add post</NavLink></li>
                            <li><NavLink to="/auth/sign-in" onClick={handleLinkClick}>Sign In</NavLink></li>
                            <li><NavLink to="/auth/sign-up" onClick={handleLinkClick}>Sign Up</NavLink></li>
                        </ul>
                    </div>
                    <div className="header__actions d-flex align-items-center gap-3">
                        <select
                            className="form-select header__lang-select"
                            value={lang}
                            onChange={handleChangeLang}>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                        </select>
                        <div className="header__auth">
                            {renderAuthSection()}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}