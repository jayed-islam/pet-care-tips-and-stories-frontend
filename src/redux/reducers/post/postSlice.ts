// src/redux/slices/postSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostFilterState {
  searchTerm: string;
  selectedCategories: string[];
  page: number;
}

const initialState: PostFilterState = {
  searchTerm: "",
  selectedCategories: [],
  page: 1,
};

const postSlice = createSlice({
  name: "postFilter",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1; // Reset page on search
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      if (state.selectedCategories.includes(action.payload)) {
        state.selectedCategories = state.selectedCategories.filter(
          (category) => category !== action.payload
        );
      } else {
        state.selectedCategories.push(action.payload);
      }
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategories = [];
      state.page = 1;
    },
  },
});

export const { setSearchTerm, toggleCategory, setPage, resetFilters } =
  postSlice.actions;
export default postSlice.reducer;
