import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { OpenVidu } from "openvidu-browser";

export const publishStream = createAsyncThunk(
  "video/publishStream",
  async (data) => {
    const OV = data.OV
    const session = data.session
    const token = data.token
    const myUserName = data.myUserName
    console.log("커넥트 전")
    await session.connect(token, { clientData: myUserName })
    console.log("커넥트 후")

    const publisher = await OV.initPublisherAsync(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    })

    console.log("쿠키/쿠커 퍼블리셔 만들어졌나?", publisher)
    await session.publish(publisher)

    const response = {
      OV, session, publisher
    }
    return response
  })

export const closeSession = createAsyncThunk(
  "video/closeSession",
  async (data) => {
    console.log("수업 끝 요청 보내기")
    const access_token = data.access_token
    const lessonId = data.lessonId

    console.log("레슨번호", lessonId)
    axios.delete(
      `/api/v1/session`,
      {
        data: {
          lessonId: lessonId
        },
        headers: {
          Access_Token: access_token
        }
      })
  }
)

export const shareScreen = createAsyncThunk(
  "screenShare/shareScreen",
  async (data) => {
    console.log("video-thunk/shareScreen")
    const shareScreenPublisher = await getShareScreenPublisher(data)
    console.log(shareScreenPublisher, "스크린퍼블리셔 만들어서 여기까지 옴")
    return shareScreenPublisher
  }
)

function getShareScreenPublisher(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("getShareScreenPublisher")
      const OV = data.OV
      const sharedPublisher = await OV.initPublisherAsync(
        undefined,
        {
          videoSource: 'screen',
          publishAudio: true,
          publishVideo: true,
          mirror: false,
          // resolution: '640x480', // The resolution of your video
          // frameRate: 30, // The frame rate of your video
          // insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        },
        (error) => {
          if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
            alert('screen extension not installed')
              // this.setState({ showExtensionDialog: true });
          } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
            alert('Your browser does not support screen sharing');
          } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
            alert('You need to enable screen sharing extension');
          } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
            alert('You need to choose a window or application to share');
          }
        },
      )
      console.log("공유 화면 발행됐나?", sharedPublisher)
      return resolve(sharedPublisher)
    } catch (error) {
      return reject(error)
    }
  })
}