import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy : "title",
  deadline : false,
  category : ""
}

const lessonInfo = createSlice({
  name : 'lessonInfo',
  initialState,
  reducers : {
    setSort : (state, action) => {
      state.sortBy = action.payload
    },
    setDeadLine : (state, action) => {
      state.deadline = action.payload
    },
    setCategories : (state, action) => {
      state.category = action.payload
    }
  }
})

export const {
  setSort, setDeadLine, setCategories
} = lessonInfo.actions
export default lessonInfo.reducer