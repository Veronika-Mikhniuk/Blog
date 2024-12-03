import { articleEndpoint } from '../config/api'
import { get } from '../utils/client'

export const requestPost = async (postId) => {
    try {
        const response = await get(articleEndpoint(postId))
        return response.data
    } catch (error) {
        return {
            hasError: true,
            status: error.response?.status,
            message: error.message,
            data: error.response?.statusText
        }
    }

}