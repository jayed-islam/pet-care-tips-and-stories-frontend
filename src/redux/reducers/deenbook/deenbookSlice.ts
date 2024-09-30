import { createSlice } from "@reduxjs/toolkit";

interface DeenbookState {}

const initialState: DeenbookState = {};

const deenbookSlice = createSlice({
  name: "deenbook",
  initialState,
  reducers: {},
});

export const {} = deenbookSlice.actions;

export default deenbookSlice.reducer;
