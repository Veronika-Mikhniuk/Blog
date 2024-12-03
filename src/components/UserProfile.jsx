import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfile } from '../redux/auth-slice'

export function UserProfile() {
    const { currentProfile } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect (() => {
        if(!currentProfile) {   
            dispatch(fetchProfile())
        }
    }, [dispatch])

    return (
        <>
            <h1>UserProfile</h1>
            <div style={{width: '100%'}}>
                <p>UserId: {currentProfile?.id}</p>
                <p>UserName: {currentProfile?.username}</p>
                <p>Email: {currentProfile?.email}</p>
            </div>
        </>
    )
}