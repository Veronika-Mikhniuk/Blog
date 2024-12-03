import {
    signUpEndpoint,
    authActivationEndpoint,
    signInEndpoint,
    refreshAccessTokenEndpoint,
    profileEndpoint
} from "../config/api"
import { courseGroup } from "../config/constants"
import { post, get } from '../utils/client'

export const requestSignUp = async (body) => {
    try {
        const response = await post(signUpEndpoint, {
            ...body,
            course_group: courseGroup
        })
        return response.data
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        }
    }
}

export const requestAuthActivation = async (body) => {
    try {
        const response = await post(authActivationEndpoint, body)
        return response.data
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        }
    }
}

export const requestSignIn = async (body) => {
    try {
        const response = await post(signInEndpoint, body)
        return response.data
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        }
    }
}

export const requestRefreshAccessToken = async (refresh) => {
    try {
        const response = await post(refreshAccessTokenEndpoint, { refresh })
        return response.data.access
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        }
    }
}

export const requestProfile = async () => {
    try {
        const response = await get(profileEndpoint)
        return response.data
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        }
    }
}