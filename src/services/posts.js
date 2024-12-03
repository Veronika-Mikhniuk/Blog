import { postsEndpoint, myPostsEndpoint } from "../config/api"
import { get, post } from '../utils/client'

export const requestPosts = async (params = {}) => {
    try {
        const response = await get(postsEndpoint, { params })
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

export const requestCreatePost = async (formData) => {
    try {
        const response = await post(postsEndpoint, formData)
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

export const requestMyPosts = async (params = {}) => {
    try {
        const response = await get(myPostsEndpoint, { params })
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