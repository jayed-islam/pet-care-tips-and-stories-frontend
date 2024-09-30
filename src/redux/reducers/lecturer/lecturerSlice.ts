import { createSlice } from "@reduxjs/toolkit";

interface LecturerState {}

const initialState: LecturerState = {};

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState,
  reducers: {},
});

export const {} = lecturerSlice.actions;

export default lecturerSlice.reducer;
