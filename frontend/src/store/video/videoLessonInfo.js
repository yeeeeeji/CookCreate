// lessonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonTitle: undefined,
  cookyerName: undefined,
  lessonStepList: undefined,
};

const videoLessonInfo = createSlice({
  name: "videoLessonInfo",
  initialState,
  reducers: {
    setLessonInfo: (state, {payload}) => {
      state.lessonTitle = payload.lessonTitle
      state.cookyerName = payload.cookyerName
      state.lessonStepList = payload.lessonStepList
    }
  },
});

export const { 
  setLessonInfo
} = videoLessonInfo.actions;
export default videoLessonInfo.reducer;