import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Review } from "../components/review/ReviewComponent";
import { actions } from "../store";
import type { RootState, AppDispatch } from '../store/index'

export async function loadReviewsActions(dispatch : AppDispatch, updatedReviews : Review[]) {
    dispatch(actions.reviews.isLoadingStart());
    const reviews = updatedReviews;
    // dispatch(actions.reviews.loadReviews(reviews));
    dispatch(actions.reviews.isLoadingEnd());
}