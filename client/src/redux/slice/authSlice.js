import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        loginStart: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        signupStart: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signupSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signupFailure: (state, action) => {
            state.error = action.payload;
        },
        signinStart: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signinSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signinFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { 
    loginStart, loginSuccess, loginFailure, 
    signupStart, signupSuccess, signupFailure, 
    signinStart, signinSuccess, signinFailure 
} = authSlice.actions;

export default authSlice.reducer;