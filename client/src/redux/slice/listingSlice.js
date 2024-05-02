import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listings: [],
    error: null,
    loading: false,
    listing: null,
};

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        fetchListingsStart: (state) => {
            state.loading = true;
        },
        fetchListingsSuccess: (state, action) => {
            state.listings = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchListingsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createListingStart: (state) => {
            state.loading = true;
        },
        createListingSuccess: (state, action) => {
            state.listing = action.payload;
            state.error = null;
            state.loading = false;
        },
        createListingFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteListingStart: (state) => {
            state.loading = true;
        },
        deleteListingSuccess: (state, action) => {
            state.listing = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteListingFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        joinListingStart: (state) => {
            state.loading = true;
        },
        joinListingSuccess: (state, action) => {
            state.listing = action.payload;
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    fetchListingsStart, fetchListingsSuccess, fetchListingsFailure,
    createListingStart, createListingSuccess, createListingFailure,
    deleteListingStart, deleteListingSuccess, deleteListingFailure,
    joinListingStart, joinListingSuccess
} = listingSlice.actions;

export default listingSlice.reducer;