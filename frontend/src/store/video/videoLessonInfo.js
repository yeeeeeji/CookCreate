// lessonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonTitle: undefined,
  cookyerName: undefined,
  lessonStepList: undefined,
  stepProgress: 0,
};

const videoLessonInfo = createSlice({
  name: "videoLessonInfo",
  initialState,
  reducers: {
    setLessonInfo: (state, {payload}) => {
      state.lessonTitle = payload.lessonTitle
      state.cookyerName = payload.cookyerName
      state.lessonStepList = payload.lessonStepList
    },
    setLessonStepList: (state, {payload}) => {
      console.log("진행단계 변경", payload.lessonStepList)
      state.lessonStepList = payload.lessonStepList
    },
    setStepProgress: (state, {payload}) => {
      console.log("진행률 변경", payload)
      state.stepProgress = payload
    }
  },
});

export const { 
  setLessonInfo, setLessonStepList, setStepProgress
} = videoLessonInfo.actions;
export default videoLessonInfo.reducer;