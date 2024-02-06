import { combineReducers, configureStore } from '@reduxjs/toolkit';
 // @ts-ignore
import { reviewsSlice } from '../store/reviewsSlice';


export const store = configureStore({
    reducer: combineReducers ({
        
        reviews: reviewsSlice.reducer,
       
    }),
});

export const actions = {
    
    reviews: reviewsSlice.actions,
   
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

