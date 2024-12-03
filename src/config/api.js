export const baseURL = 'https://studapi.teachmeskills.by'

export const signUpEndpoint = `/auth/users/`
export const signInEndpoint = `/auth/jwt/create/`
export const refreshAccessTokenEndpoint = `/auth/jwt/refresh/`
export const profileEndpoint = `/auth/users/me/`
export const postsEndpoint = `/blog/posts/`
export const myPostsEndpoint = `/blog/posts/my_posts/`
export const authActivationEndpoint = '/auth/users/activation/'
export const articleEndpoint = (postId) => `/blog/posts/${postId}`