import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { OpenVidu } from "openvidu-browser";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export const joinSession = createAsyncThunk(
  "video/joinSession",
  async (data) => {
    const OV = data.OV
    const session = data.session
    const mySessionId = data.mySessionId
    const myUserName = data.myUserName
    const role = data.role

    console.log("2")
    console.log(data)
    try {
      console.log("3")
      const token = await getToken({sessionId: mySessionId});
      console.log("getToken 이후", token)

      if (myUserName && session) {
        console.log("8")
        console.log(token, myUserName)
        await session.connect(token, { clientData: myUserName, role });
        console.log("9")
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---
        console.log("10", publisher)
        await session.publish(publisher);

        /** switchCamera 관련 추가 부분 */
        // Obtain the current video device in use
        // var devices = await OV.getDevices();
        // var videoDevices = devices.filter(device => device.kind === 'videoinput');
        // var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        // var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        // Set the main video in the page to display our webcam and store our Publisher
        const response = {
          // currentVideoDevice: currentVideoDevice,
          publisher: publisher,
        }
        /** 여기까지 */

        console.log("11")
        console.log(publisher)
        return response
      }
    } catch (error) {
      console.log('There was an error connecting to the session:', error.code, error.message);
    }
  }
)

async function getToken(mySessionId) {
  console.log("4")
  // console.log(mySessionId)

  const newSessionId = await createSession(mySessionId.sessionId)
  console.log("5", newSessionId)

  const token = await createToken(newSessionId)

  console.log("7")
  console.log(token)
  return token
}

function createSession(sessionId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
          APPLICATION_SERVER_URL + 'api/sessions',
          { customSessionId: sessionId },
          {
            headers: {
              // Authorization:
              // 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            }
          },
    )

    setTimeout(() => {
      console.log('개발자 설정을 통한 강제 리턴')
      console.log(sessionId)
      return resolve(sessionId)
    }, 1000)
    console.log(response, "엥")
    return response.data
    } catch (response) {
      console.log(response)
      let error = Object.assign({}, response)
      if (error?.response?.status === 409) {
          return resolve(sessionId)
      }
    }
  })
}

function createToken(sessionId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL +
        'api/sessions/' +
        sessionId +
        '/connections',
        {},
        {
          headers: {
            // Authorization:
            //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          }
        },
      )
      console.log("6")
      console.log(response.data)
      return resolve(response.data)
    } catch (error) {
      return reject(error)
    }
  })
}

export const publishCookiee = createAsyncThunk(
  "video/publishCookiee",
  async (data) => {
    const cookieeConnection = data.cookieeConnection
    const myUserName = data.myUserName

    const cookieeOV = new OpenVidu()
    const cookieeSession = cookieeOV.initSession()

    await cookieeSession.connect(cookieeConnection.token, { clientData: myUserName })

    const cookieePublisher = await cookieeOV.initPublisherAsync(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    })

    console.log("쿠키 퍼블리셔 만들어졌나?", cookieePublisher)
    await cookieeSession.publish(cookieePublisher)

    const response = {
      OV: cookieeOV,
      session: cookieeSession,
      publisher: cookieePublisher
    }
    return response
  })