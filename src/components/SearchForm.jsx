import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { icons } from '../assets/icons'

import '../styles/SearchForm.scss'

export function SearchForm() {
    const { query: quryParam } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState(quryParam)

    useEffect(() => {
        if (!location.pathname.includes('/search')) {
            setQuery('')
        }
    }, [location.pathname])

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const encodedQuery = encodeURIComponent(query)
        navigate(`/posts/all/search/${encodedQuery}/1`)
    }

    const handleClear = (event) => {
        if (!event.target.value) {
            setQuery('')
            navigate('/posts/all/1')
        }
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="search"
                className="search-form__input"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                onInput={handleClear}
            />
            <button className="search-form__button" type="submit">
                <img src={icons.search} alt="Search" />
            </button>
        </form>
    )
}