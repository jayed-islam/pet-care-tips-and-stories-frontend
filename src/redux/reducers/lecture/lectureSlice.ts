import { createSlice } from "@reduxjs/toolkit";

interface LectureState {}

const initialState: LectureState = {};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
});

export const {} = lectureSlice.actions;

export default lectureSlice.reducer;
