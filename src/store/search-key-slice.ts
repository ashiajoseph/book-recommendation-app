import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface SearchKeyState {
  searchKey: string;
}
const initialState: SearchKeyState = {
  searchKey: '',
};

const searchKeySlice = createSlice({
  name: 'searchKey',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
  },
});

export const {
  update,
} = searchKeySlice.actions;

export const searchKeyReducer = searchKeySlice.reducer;
export default searchKeySlice;

export const getSearchKey = (state: RootState) => state.searchKeyword.searchKey;
