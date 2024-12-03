import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../redux/post-slice.js'
import { Article } from '../components/Article.jsx'


export function Post(props) {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { value: post, isLoading, error } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(fetchPost(postId))
    }, [postId, dispatch])


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Article {...post} />
    )
}