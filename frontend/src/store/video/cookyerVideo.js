import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkCookieeList: [],
  checkCookiee: '',
  handsUpCookieeList: [],
  handsUpCookiee: '',
}

export const cookyerVideo = createSlice({
  name: 'cookyerVideo',
  initialState,
  reducers: {
    setCheckCookieeList: (state, { payload }) => {
      state.checkCookieeList = payload
    },
    setCheckCookiee: (state, { payload }) => {
      state.checkCookiee = payload
    },
    setHandsUpCookieeList: (state, { payload }) => {
      state.handsUpCookieeList = payload
    },
    setHandsUpCookiee: (state, { payload }) => {
      state.handsUpCookiee = payload
    }
  },
  extraReducers: {
  }
})

export const {
  setCheckCookieeList, setCheckCookiee, setHandsUpCookieeList, setHandsUpCookiee
} = cookyerVideo.actions
export default cookyerVideo.reducer