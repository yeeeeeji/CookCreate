import { createSlice } from '@reduxjs/toolkit'
import { joinSession } from './video-thunk'

const initialState = {
  OV: null,
  session: undefined,
  token: undefined,
  publisher: undefined,
  mainStreamManager: undefined,
  mySessionId: 'MMTA',  // 세션 생성했을 때 받아오는 세션 아이디
  myUserName: 'HiHi',
  subscribers: [],
  isVideoPublished: true,
  isAudioPublished: true,
}

export const video = createSlice({
  name: 'video',
  initialState,
  reducers: {
    initOVSession: (state, { payload }) => {
      state.OV = payload.OV
      state.session = payload.session
      console.log("initOVSession", state.OV, state.session)
    },
    setToken: (state, { payload }) => {
      state.token = payload.token
    },
    setPublisher: (state, { payload }) => {
      console.log("13")
      state.publisher = payload.publisher
    },
    setMainStreamManager: (state, { payload }) => {
      state.mainStreamManager = payload.publisher
    },
    setMySessionId: (state, { payload }) => {
      state.mySessionId = payload.mySessionId
    },
    setMyUserName: (state, { payload }) => {
      state.myUserName = payload.myUserName
    },
    setSubscribers: (state, {payload}) => {
      state.subscribers = payload.subscribers
    },
    videoMute: (state) => {
      state.publisher.publishVideo(!state.isVideoPublished)
      state.isVideoPublished = !state.isVideoPublished
      console.log("비디오", state.isVideoPublished)
    },
    audioMute: (state) => {
      state.publisher.publishAudio(!state.isAudioPublished)
      state.isAudioPublished = !state.isAudioPublished
      console.log("오디오", state.isAudioPublished)
    },
    leaveSession: (state) => {
      const mySession = state.session
      if (mySession) {
        mySession.disconnect()
      }
      state.OV = null
      state.session = undefined
      state.subscribers = []
      state.mySessionId = 'SessionOO'
      state.myUserName = 'Leave'
      state.mainStreamManager = undefined
      state.publisher = undefined
    },
    enteredSubscriber: (state, action) => {
      // console.log("여기가 문제라고??", action.payload)
      state.subscribers.push(action.payload)
    },
    deleteSubscriber: (state, action) => {
      let index = state.subscribers.indexOf(action.payload, 0)
      if (index > -1) {
        state.subscribers.splice(index, 1)
      }
    }
  },
  extraReducers: {
    [joinSession.fulfilled]: (state, { payload }) => {
      console.log("joinSession fulfilled", payload)
      // state.currentVideoDevice = payload.currentVideoDevice
      state.mainStreamManager = payload.publisher
      state.publisher = payload.publisher
      // console.log(state.publisher)
    },
    [joinSession.rejected]: (state, { payload }) => {
      console.log("joinSession rejected")
    }
  }
})

export const {
    initOVSession, setToken, setPublisher, setMainStreamManager,
    setMySessionId, setMyUserName, setSubscribers,
    videoMute, audioMute, leaveSession,
    enteredSubscriber, deleteSubscriber,
} = video.actions
export default video.reducer