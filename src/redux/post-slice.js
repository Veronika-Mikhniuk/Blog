import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestPost } from "../services/post"

const initialState = {
    value: {},
    isLoading: false,
    error: null
}

export const fetchPost = createAsyncThunk(
    'post/postPost',
    async (postId, { rejectWithValue }) => {
        const data = await requestPost(postId)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    })

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.value = action.payload
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload?.data
            })
    }
})

export const postReducer = postSlice.reducer