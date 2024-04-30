import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import itemReducer from './slice/itemSlice';
import userReducer from './slice/userSlice';
import listingReducer from './slice/listingSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    item: itemReducer,
    listing: listingReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['user', 'item', 'listing'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);