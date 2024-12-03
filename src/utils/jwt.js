import { jwtDecode } from 'jwt-decode'

export const jwt = {
    _jwtKey: 'jwt',

    setToLocalStorage(jwt) {
        const json = JSON.stringify(jwt)
        localStorage.setItem(this._jwtKey, json)
    },

    getFromLocalStorage() {
        const jwt = localStorage.getItem(this._jwtKey)

        if (!jwt) return null

        return JSON.parse(jwt)
    },

    isAccessTokenExpired(accessToken) {
        const decodedJwt = jwtDecode(accessToken)
        const { exp } = decodedJwt
        const now = Date.now() / 1000
        return now >= exp
    }
}