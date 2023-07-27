// lessonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
  lessonTitle: "",
  maximum: 1,
  price: 0,
  lessonDate: "",
  difficulty: "",
  timeTaken: 60,
  description: "",
  materials: [],
  videoUrl: "",
  thumbnailUrl: "",
  lessonStepList: [],
};

const lesson = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonTitle: (state, action) => {
      state.lessonTitle = action.payload;
    },
    setCategory : (state, action) => {
      state.categoryId = action.payload
    },
    setTimeTaken : (state, action) => {
      state.timeTaken = action.payload
    },
    setDateTime : (state, action) =>{
      state.lessonDate = action.payload
    },
    setPrice : (state, action) =>{
      state.price = action.payload
    },
    setMaximum : (state, action) => {
      state.maximum = action.payload
    },
    setDifficulty : (state, action) => {
      state.difficulty = action.payload
    },
    setDescription : (state, action) => {
      state.description = action.payload
    },
    setVideoUrl : (state, action) => {
      state.videoUrl = action.payload
    },
    setMaterials : (state, action) => {
      state.materials = action.payload
    },
    setLessonStepList : (state, action) => {
      state.lessonStepList = action.payload
    },
    setThumbnail : (state, action) => {
      state.thumbnailUrl = action.payload
    }

  },
});

export const { 
  setLessonTitle, setCategory, setTimeTaken, setDateTime,
  setPrice, setMaximum, setDifficulty, setDescription, setVideoUrl, 
  setMaterials, setLessonStepList, setThumbnail} = lesson.actions;
export default lesson.reducer;