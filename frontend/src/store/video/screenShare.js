import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenShareActive: false,
  shareScreenPublisher: null,
  streamManager: null,
}

export const screenShare = createSlice({
  name: 'screenShare',
  initialState,
  reducers: {
    setScreenShareActive: (state, { payload }) => {
      state.screenShareActive = payload.screenShareActive
    },
    setStreamManager: (state, { payload }) => {
      state.streamManager = payload.streamManager
    },
    setShareScreenPublisher: (state, { payload }) => {
      state.shareScreenPublisher = payload.shareScreenPublisher
    }
  },
  extraReducers: {
    [shareScreen.fulfilled]: (state, { payload }) => {
      console.log("공유 화면 퍼블리셔 저장 성공", payload)
      state.shareScreenPublisher = payload
    },
    [shareScreen.rejected]: (state, { payload }) => {
      console.log("공유 화면 퍼블리셔 저장 실패", payload)
    }
  }
})

export const {
  setScreenShareActive, setStreamManager, setShareScreenPublisher
} = screenShare.actions
export default screenShare.reducer