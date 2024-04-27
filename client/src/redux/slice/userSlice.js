import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
    loading: false,
    fetchUser: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signupStart: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false;
        },
        signupFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logoutStart: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        logoutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        fetchUserStart: (state) => {
            state.loading = true;
        },
        fetchUserSuccess: (state, action) => { 
            state.fetchUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { 
    loginStart, loginSuccess, loginFailure, 
    signupStart, signupSuccess, signupFailure, 
    logoutStart, logoutSuccess, logoutFailure,
    fetchUserStart, fetchUserSuccess, fetchUserFailure,
} = userSlice.actions;

export default userSlice.reducer;