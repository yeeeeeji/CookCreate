import { createSlice } from '@reduxjs/toolkit'
import { closeSession, joinSession, publishStream } from './video-thunk'

const initialState = {
  OV: null,
  session: undefined,
  sessionId: undefined,
  publisher: undefined,
  mainStreamManager: undefined,
  subscribers: [],
  isVideoPublished: true,
  isAudioPublished: true,
  videoLessonId: undefined,
  isSessionOpened: false,
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
    setSessionId: (state, { payload }) => {
      console.log("세션 아이디 저장 성공", payload)
      state.sessionId = payload.sessionId
    },
    setPublisher: (state, { payload }) => {
      console.log("13")
      state.publisher = payload.publisher
    },
    setMainStreamManager: (state, { payload }) => {
      state.mainStreamManager = payload.publisher
    },
    setSubscribers: (state, {payload}) => {
      state.subscribers = payload.subscribers
    },
    setVideoLessonId: (state, {payload}) => {
      state.videoLessonId = payload.videoLessonId
    },
    setIsSessionOpened: (state, {payload}) => {
      state.isSessionOpened = payload.isSessionOpened
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
      // const mySession = state.session
      // if (mySession) {
      //   mySession.disconnect()
      // }
      state.OV = null
      state.session = undefined
      state.sessionId = undefined
      state.publisher = undefined
      state.mainStreamManager = undefined
      state.subscribers = []
      state.isVideoPublished = true
      state.isAudioPublished = true
      state.videoLessonId = undefined
      state.isSessionOpened = false
    },
    enteredSubscriber: (state, action) => {
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
      // state.mainStreamManager = payload.publisher
      state.publisher = payload
      // console.log(state.publisher)
    },
    [joinSession.rejected]: (state, { payload }) => {
      console.log("joinSession rejected")
    },
    [publishStream.fulfilled]: (state, { payload }) => {
      console.log("publishStream fulfilled", payload)
      state.OV = payload.OV
      state.session = payload.session
      state.publisher = payload.publisher
    },
    [publishStream.rejected]: (state, { payload }) => {
      console.log("publishStream rejected")
    },
    [closeSession.fulfilled]: (state, { payload }) => {
      console.log("closeSession fulfilled", payload)
      state.OV = null
      state.session = undefined
      state.sessionId = undefined
      state.publisher = undefined
      state.mainStreamManager = undefined
      state.subscribers = []
      state.isVideoPublished = true
      state.isAudioPublished = true
      state.videoLessonId = undefined
      state.isSessionOpened = false
    },
    [closeSession.rejected]: (state, { payload }) => {
      console.log("closeSession rejected")
    } 
  }
})

export const {
    initOVSession, setPublisher, setMainStreamManager, setSessionId,
    setSubscribers, setVideoLessonId, setIsSessionOpened,
    videoMute, audioMute, leaveSession,
    enteredSubscriber, deleteSubscriber,
} = video.actions
export default video.reducer