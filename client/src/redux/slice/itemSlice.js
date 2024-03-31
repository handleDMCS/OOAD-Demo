import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    error: null,
    loading: false,
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
    },
});

export const {
    addItemStart, addItemSuccess, addItemFailure,
    fetchItemsStart, fetchItemsSuccess, fetchItemsFailure
} = itemSlice.actions;

export default itemSlice.reducer;