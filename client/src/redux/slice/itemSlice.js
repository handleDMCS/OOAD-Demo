import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    pendings: [],
    verified: [],
    error: null,
    loading: false,
    item: null,
};

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addItemStart: (state) => { 
            state.loading = true;
        },
        addItemSuccess: (state, action) => {
            state.items.push(action.payload);
            state.error = null;
            state.loading = false;
        },
        addItemFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        fetchItemsStart: (state) => {
            state.loading = true;
        },
        fetchItemsSuccess: (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
            state.totalPage = Math.ceil(action.payload.length / 5);
        },
        fetchItemsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteItemStart: (state, action) => {
            state.loading = true;
            state.item = action.payload;
        },
        deleteItemSuccess: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            state.error = null;
            state.loading = false;
            state.item = null;
        },
        deleteItemFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.item = null;
        },
        updateItemStart: (state, action) => {
            state.loading = true;
            state.item = action.payload;
        },
        updateItemSuccess: (state, action) => {
            state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item);
            state.error = null;
            state.loading = false;
            state.item = null;
        },
        updateItemFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        fetchPendingStart: (state) => {
            state.loading = true;
        },
        fetchPendingSuccess: (state, action) => {
            state.pendings = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchPendingFailure: (state, action) => {  
            state.error = action.payload;
            state.loading = false;
        },
        fetchVerifiedStart: (state) => {
            state.loading = true;
        },
        fetchVerifiedSuccess: (state, action) => {
            state.verified = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchVerifiedFailure: (state, action) => {  
            state.error = action.payload;
            state.loading = false;
        },
        verifyItemStart: (state, action) => {
            state.loading = true;
            state.item = action.payload;
        },
        verifyItemSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.item = null;
        },
        verifyItemFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.item = null;
        }
    },
});

export const {
    addItemStart, addItemSuccess, addItemFailure,
    fetchItemsStart, fetchItemsSuccess, fetchItemsFailure,
    deleteItemStart, deleteItemSuccess, deleteItemFailure,
    updateItemStart, updateItemSuccess, updateItemFailure,
    fetchPendingStart, fetchPendingSuccess, fetchPendingFailure,
    fetchVerifiedStart, fetchVerifiedSuccess, fetchVerifiedFailure,
    verifyItemStart, verifyItemSuccess, verifyItemFailure,
} = itemSlice.actions;

export default itemSlice.reducer;