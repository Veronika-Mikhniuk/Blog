import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    requestSignUp,
    requestAuthActivation,
    requestSignIn,
    requestProfile,
    requestRefreshAccessToken
} from '../services/auth.js'
import { jwt } from '../utils/jwt.js'

const initialState = {
    userEmail: null,
    isLoading: false,
    signUpError: null,
    signInError: null,
    refreshTokenError: null,
    profileError: null,
    activationError: null,
    isUserRegistered: false,
    isActivated: false,
    jwt: jwt.getFromLocalStorage() || null,
    currentProfile: null
}

export const fetchSignUp = createAsyncThunk(
    'auth/fetchSignUp',
    async (body, { rejectWithValue }) => {
        const data = await requestSignUp(body)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const fetchAuthActivation = createAsyncThunk(
    'auth/fetchAuthActivation',
    async (body, { rejectWithValue }) => {
        const data = await requestAuthActivation(body)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const fetchSignIn = createAsyncThunk(
    'auth/fetchSignIn',
    async (body, { rejectWithValue }) => {
        const data = await requestSignIn(body)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        jwt.setToLocalStorage(data)

        return data
    }
)

export const fetchRefreshAccessToken = createAsyncThunk(
    'auth/fetchRefreshAccessToken',
    async (refresh, { rejectWithValue, getState }) => {
        const data = await requestRefreshAccessToken(refresh)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        const currentJwt = getState().auth.jwt

        jwt.setToLocalStorage({ ...currentJwt, access: data })
        console.log('Обновили данные в Local Storage c новым токеном')
        return data
    }
)

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.jwt.access
        const data = await requestProfile(token)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Signing Up
            .addCase(fetchSignUp.pending, (state) => {
                state.isLoading = true
                state.signUpError = null
            })
            .addCase(fetchSignUp.fulfilled, (state, action) => {
                state.isLoading = false
                state.userEmail = action.payload.email
                state.isUserRegistered = true
            })
            .addCase(fetchSignUp.rejected, (state, action) => {
                state.isLoading = false
                state.signUpError = action.error.message
            })
            // Activation
            .addCase(fetchAuthActivation.pending, (state) => {
                state.isLoading = true
                state.isActivated = false
                state.activationError = null
            })
            .addCase(fetchAuthActivation.fulfilled, (state) => {
                state.isLoading = false
                state.isActivated = true
            })
            .addCase(fetchAuthActivation.rejected, (state, action) => {
                state.isLoading = false
                state.isActivated = false
                state.activationError = action.payload.data.uid
            })
            // Signing In
            .addCase(fetchSignIn.pending, (state) => {
                state.isLoading = true
                state.signInError = null
            })
            .addCase(fetchSignIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.jwt = action.payload
            })
            .addCase(fetchSignIn.rejected, (state, action) => {
                state.isLoading = false
                state.signInError = action.payload.data.detail
            })
            // RefreshAccessToken
            .addCase(fetchRefreshAccessToken.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchRefreshAccessToken.fulfilled, (state, action) => {
                state.isLoading = false
                state.jwt.access = action.payload
            })
            .addCase(fetchRefreshAccessToken.rejected, (state, action) => {
                state.isLoading = false
                state.refreshTokenError = action.error.message
            })
            // Profile
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentProfile = action.payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false
                state.profileError = action.error.message
            })
    }
})

export const authReducer = authSlice.reducer