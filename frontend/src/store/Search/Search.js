import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type : "all",
  keyword : "",
  category : [],
  order : "",
  deadline : true
}

const search = createSlice({
  name : "search",
  initialState,
  reducers : {
    setType : (state, action) => {
      state.type = action.payload
    }
  }
})

export const {
  setType
} = search.actions
export default search.reducer