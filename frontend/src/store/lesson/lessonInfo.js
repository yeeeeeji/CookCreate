import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId : '',
  categoryName : '',
  cookyerName : '',
  description : '',
  difficulty : '',
  lessonTitle : '',
  jjimCount : '',
  lessonDate : '',
  lessonId : '',
  materials : '',
  maximum : 0,
  thumbnailUrl : '',
  lessonStepList : [],
  timeTaken : 0,
  price : 0,
  remaining : 0,
  videoUrl : '',
  introduce : ''
}

const lessonInfo = createSlice({
  name : 'lessonInfo',
  initialState,
  reducers : {
    setCategoryId : (state, action) => {
      state.categoryId = action.payload
    },
    setCategoryName : (state, action) => {
      state.categoryName = action.payload
    },
    setCookyerName : (state, action) => {
      state.cookyerName = action.payload
    },
    setDescription : (state, action) => {
      state.description = action.payload
    },
    setDifficulty : (state, action) => {
      state.difficulty = action.payload
    },
    setJjimCount : (state, action) => {
      state.jjimCount = action.payload
    },
    setLessonDate : (state, action) => {
      state.lessonDate = action.payload
    },
    setLessonId : (state, action) => {
      state.lessonId = action.payload
    },
    setMaterials : (state, action) => {
      state.materials = action.payload
    },
    setMaximum : (state, action) => {
      state.maximum = action.payload
    },
    setThumbnailUrl : (state, action) => {
      state.thumbnailUrl = action.payload
    },
    setLessonStepList : (state, action) => {
      state.lessonStepList = action.payload
    },
    setTimeTaken : (state, action) => {
      state.timeTaken = action.payload
    },
    setLessonTitle : (state, action) => {
      state.lessonTitle = action.payload
    },
    setPrice : (state, action) => {
      state.price = action.payload
    },
    setRemaining : (state, action) => {
      state.remaining = action.payload
    },
    setVideoUrl : (state, action) => {
      state.videoUrl = action.payload
    },
    setIntroduce : (state, action) => {
      state.introduce = action.payload
    }
  }
})

export const {
  setCategoryId, setCategoryName,
  setCookyerName, setDifficulty, setDescription, setLessonTitle,
  setJjimCount, setLessonDate, setLessonId,
  setMaterials, setMaximum, setPrice, setRemaining, setThumbnailUrl,
  setLessonStepList, setTimeTaken, setVideoUrl, setIntroduce
} = lessonInfo.actions
export default lessonInfo.reducer