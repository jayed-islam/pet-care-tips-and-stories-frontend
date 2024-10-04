// src/redux/slices/postSlice.ts

import { RootState } from "@/redux/store";
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

export const hasPurchasedPost = (state: RootState, postId: string): boolean => {
  const currentUser = state.auth.user;

  if (!currentUser || !currentUser.purchasedPosts) {
    return false;
  }

  // Check if the postId exists in the user's purchasedPosts array
  return currentUser.purchasedPosts.some(
    (post) => post._id.toString() === postId
  );
};

// export const hasPurchasedPost = (state: RootState, postId: string): boolean => {
//   const currentUser = state.auth.user;
//   const post = state.posts.items.find((p) => p._id === postId);

//   if (!currentUser || !currentUser.purchasedPosts || !post) {
//     return false;
//   }

//   // If the post is premium, check if the user has purchased it
//   if (post.isPremium) {
//     return currentUser.purchasedPosts.some(
//       (purchasedPostId) => purchasedPostId.toString() === postId
//     );
//   }

//   // If the post is not premium, it's accessible to everyone
//   return true;
// };

export const { setSearchTerm, toggleCategory, setPage, resetFilters } =
  postSlice.actions;
export default postSlice.reducer;
