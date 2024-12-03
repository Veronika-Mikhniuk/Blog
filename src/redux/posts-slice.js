import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestPosts, requestMyPosts, requestCreatePost } from '../services/posts.js'
import { normalizePosts } from '../utils/normalizePosts'

const initialState = {
    list: [],
    myList: [],
    isLoading: false,
    postsError: null,
    createPostError: null,
    myPostsError: null,
    limit: 11,
    pageCount: null,
    ordering: 'date'
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (params = {}, { rejectWithValue, getState }) => {
        const limit = getState().posts.limit
        const offset = limit * (params.currentPage - 1)
        const data = await requestPosts({ limit, offset, ...params })

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const fetchCreatePost = createAsyncThunk(
    'posts/fetchCreatePost',
    async (formData, { rejectWithValue }) => {
        const data = await requestCreatePost(formData)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const fetchMyPosts = createAsyncThunk(
    'posts/fetchMyPosts',
    async (currentPage, { rejectWithValue, getState }) => {
        const limit = getState().posts.limit
        const offset = limit * (currentPage - 1)
        const data = await requestMyPosts({ limit, offset })

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        like: (state, action) => {
            const postId = action.payload
            const post = state.list.find((post) => post.id === postId) || state.myList.find((post) => post.id === postId)
            if (post) {
                post.likes += 1
                post.rating = post.likes - post.dislikes
            }
        },
        unlike: (state, action) => {
            const postId = action.payload
            const post = state.list.find((post) => post.id === postId) || state.myList.find((post) => post.id === postId)
            if (post && post.likes > 0) {
                post.likes += 1
                post.rating = post.likes - post.dislikes
            }
        },
        dislike: (state, action) => {
            const postId = action.payload
            const post = state.list.find((post) => post.id === postId) || state.myList.find((post) => post.id === postId)
            if (post) {
                post.dislikes += 1
                post.rating = post.likes - post.dislikes
            }
        },
        undislike: (state, action) => {
            const postId = action.payload
            const post = state.list.find((post) => post.id === postId) || state.myList.find((post) => post.id === postId)
            if (post && post.dislikes > 0) {
                post.dislikes -= 1
                post.rating = post.likes - post.dislikes
            }
        },
        setFavourite: (state, action) => {
            const postId = action.payload
            const post = state.list.find((post) => post.id === postId) || state.myList.find((post) => post.id === postId)
            if (post) {
                post.isFavourite = !post.isFavourite
            }
        },
        setOrdering: (state, action) => {
            state.ordering = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            //allPosts
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true
                state.postsError = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = normalizePosts(action.payload.results)
                state.pageCount = Math.ceil(action.payload.count / state.limit)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false
                state.postsError = action.error.message
            })
            //createPost
            .addCase(fetchCreatePost.pending, (state) => {
                state.isLoading = true
                state.createPostError = null
            })
            .addCase(fetchCreatePost.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchCreatePost.rejected, (state, action) => {
                state.isLoading = false
                console.log(action)
                state.createPostError = action.error.message
            })
            //myPosts
            .addCase(fetchMyPosts.pending, (state) => {
                state.isLoading = true
                state.myPostsError = null
            })
            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.myList = normalizePosts(action.payload.results)
                state.pageCount = Math.ceil(action.payload.count / state.limit)
            })
            .addCase(fetchMyPosts.rejected, (state, action) => {
                state.isLoading = false
                state.myPostsError = action.error.message
            })
    }
})

export const { like, unlike, dislike, undislike, setFavourite, setOrdering } = postsSlice.actions
export const postsReducer = postsSlice.reducer