import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {userSlice} from './userSlice';


export const store = configureStore({
    reducer: combineReducers ({
        user:  userSlice.reducer, 
    }),
});

export const actions = {
    user: userSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

