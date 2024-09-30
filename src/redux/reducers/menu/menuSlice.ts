import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  isMenuOpen: boolean;
}

const initialState: MenuState = {
  isMenuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu(state) {
      state.isMenuOpen = true;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
