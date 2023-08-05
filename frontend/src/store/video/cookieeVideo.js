import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  check: false,
  handsUp: false,
  curStep: undefined,
}

export const cookieeVideo = createSlice({
  name: 'cookieeVideo',
  initialState,
  reducers: {
    setCheck: (state) => {
      state.check = true
    },
    resetCheck: (state) => {
      state.check = false
    },
    setHandsUp: (state) => {
      state.handsUp = true
    },
    resetHandsUp: (state) => {
      state.handsUp = false
    },
    setCurStep: (state, { payload }) => {
      console.log("요리단계 시그널 받아 저장", payload)
      state.curStep = payload
    }
  },
  extraReducers: {
  }
})

export const {
  setCheck, resetCheck, setHandsUp, resetHandsUp, setCurStep
} = cookieeVideo.actions
export default cookieeVideo.reducer