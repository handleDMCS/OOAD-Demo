import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
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
    },
});

export const {
    addItemStart, addItemSuccess, addItemFailure,
    fetchItemsStart, fetchItemsSuccess, fetchItemsFailure,
    deleteItemStart, deleteItemSuccess, deleteItemFailure,
    updateItemStart, updateItemSuccess, updateItemFailure,
} = itemSlice.actions;

export default itemSlice.reducer;