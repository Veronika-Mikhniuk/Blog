import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShownImage: false,
    data: {}
}

export const previewImageSlice = createSlice({
    name: 'previewImage',
    initialState,
    reducers: {
        showPreviewImage: (state, action) => {
            state.isShownImage = true
            state.data = action.payload
        },
        hidePreviewImage: (state) => {
            state.isShownImage = false
            state.data = {}
        }
    }
})

export const { showPreviewImage, hidePreviewImage } = previewImageSlice.actions
export const previewImageReducer = previewImageSlice.reducer