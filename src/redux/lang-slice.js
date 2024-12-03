import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'en'
}

export const LangSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.value = action.payload
        },
    }
})

export const { setLang } = LangSlice.actions
export const langReducer = LangSlice.reducer