import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../components/review/ReviewComponent';

export interface ReviewsState {
  reviews: Review[],
  isLoading: boolean
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false
}
export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    isLoadingStart: (state) => {
      state.isLoading = true;
    },
    isLoadingEnd: (state) => {
      state.isLoading = false;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  //   loadReview: (state, action) => {
  //     state.review = action.payload;
  // },
}});


