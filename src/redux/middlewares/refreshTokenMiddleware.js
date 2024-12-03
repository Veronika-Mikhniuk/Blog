import { fetchRefreshAccessToken } from '../auth-slice'
import { jwt } from '../../utils/jwt'

export const refreshTokenMiddleware = store => next => async action => {
    const isNotNeedRefresh = !action.type.includes('fetch') || action.type.includes('fetchRefreshAccessToken')

    if (isNotNeedRefresh) {
        return next(action)
    }

    const tokens = store.getState().auth.jwt

    if (!tokens) {
        return next(action)
    }

    const isExpired = jwt.isAccessTokenExpired(tokens.access)

    if (isExpired) {
        console.log('Смена токена сработала')
        await store.dispatch(fetchRefreshAccessToken(tokens.refresh))
        return next(action)
    } else {
        return next(action)
    }
}