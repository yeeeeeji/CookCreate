import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId : '',
  cookyerName : '',
  difficulty : '',
  jjimCount : '',
  lessonDate : '',
  lessonId : '',
  materials : '',
  maximum : '',
}

const lessonInfo = createSlice({
  name : 'lessonInfo',
  initialState,
  reducers : {
    setCategoryId : (state, action) => {
      state.categoryId = action.payload
    },
    setCookyerName : (state, action) => {
      state.cookyerName = action.payload
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
    }
  }
})

export const {
  setCategoryId, setCookyerName, setDifficulty,
  setJjimCount, setLessonDate, setLessonId,
  setMaterials, setMaximum
} = lessonInfo.actions
export default lessonInfo.reducer