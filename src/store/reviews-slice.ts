import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '../types/books/review';

interface ReviewsState {
  reviews: Record<string, Review>;
}

const initialState: ReviewsState = {
  reviews: {},
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addOrUpdateReview: (state, action: PayloadAction<Review>) => {
      const review = action.payload;
      state.reviews[review.bookId] = review;
    },

    removeReview: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      delete state.reviews[bookId];
    },
  },
});

// Export actions
export const {
  addOrUpdateReview,
  removeReview,
} = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
export default reviewsSlice;


export const selectReviewByBookId = (state: { reviews: ReviewsState }, bookId: string): Review | undefined => {
  return state.reviews.reviews[bookId];
};

