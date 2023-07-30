import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connectionId: '',
  audioActive: true,
  videoActive: true,
  screenShareActive: false,
  nickname: '',
  streamManager: null,
  type: 'local'  // local | remote
}

export const screenShare = createSlice({
  name: 'screenShare',
  initialState,
  reducers: {
    setAudioActive: (state, { payload }) => {
      state.audioActive = payload.isAudioActive
    },
    setVideoActive: (state, { payload }) => {
      state.videoActive = payload.isVideoActive
    },
    setScreenShareActive: (state, { payload }) => {
      state.screenShareActive = payload.isScreenShareActive
    },
    setStreamManager: (state, { payload }) => {
      state.streamManager = payload.streamManager
    },
    setConnectionId: (state, { payload }) => {
      state.connectionId = payload.connectionId
    },
    setNickName: (state, { payload }) => {
      state.nickname = payload.nickname
    },
    setType: (state, { payload }) => {
      const type = payload.type
      if (type === 'local' | type === 'remote') {
        state.type = type
      }
    }
  },
  extraReducers: {
  }
})

export const {
  setAudioActive, setVideoActive, setScreenShareActive, setStreamManager, setConnectionId, setNickName, setType
} = screenShare.actions
export default screenShare.reducer