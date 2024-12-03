import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShownModal: false,
    data: {}
}

export const previewPostSlice = createSlice({
    name: 'previewPost',
    initialState,
    reducers: {
        showPreviewModal: (state) => {
            state.isShownModal = true
        },
        hidePreviewModal: (state) => {
            state.isShownModal = false
        },
        setPreviewData: (state, action) => {
            state.data = action.payload
        },
        resetPreviewData: (state) => {
            state.data = {}
        }
    }
})

export const { showPreviewModal, hidePreviewModal, setPreviewData, resetPreviewData } = previewPostSlice.actions
export const previewPostReducer = previewPostSlice.reducer