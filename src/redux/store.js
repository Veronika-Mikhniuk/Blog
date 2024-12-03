import { configureStore } from '@reduxjs/toolkit'
import { previewPostReducer } from './preview-post-slice'
import { previewImageReducer } from './preview-image-slice'
import { postsReducer } from './posts-slice'
import { postReducer } from './post-slice'
import { langReducer } from './lang-slice'
import { authReducer } from './auth-slice'
import { refreshTokenMiddleware } from './middlewares/refreshTokenMiddleware'

const middlewares = [refreshTokenMiddleware]

export const store = configureStore({
    reducer: {
        previewPost: previewPostReducer,
        previewImage: previewImageReducer,
        lang: langReducer,
        posts: postsReducer,
        post: postReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
})