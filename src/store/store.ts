import { configureStore } from '@reduxjs/toolkit';
import reviewReducer from './reviews-slice';
import searchKeyReducer from './search-key-slice';

// Redux Store Configuration
export const store = configureStore({
  reducer: {
    reviews: reviewReducer.reducer,
    searchKeyword: searchKeyReducer.reducer,
  },
});

// TypeScript Types for the Store
// These types are used by our custom hooks to provide full type safety and autocomplete.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
