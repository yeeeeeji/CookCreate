import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export const joinSession = createAsyncThunk(
  "video/joinSession",
  async (data) => {
    const OV = data.OV
    const session = data.session
    const mySessionId = data.mySessionId
    const myUserName = data.myUserName

    console.log("2")
    console.log(data)
    // console.log(session)
    try {
      console.log("3")
      // console.log(initialState)
      // console.log(initialState.mySessionId)
      const token = await getToken({sessionId: mySessionId});
      console.log("getToken 이후", token)

      if (myUserName && session) {
        console.log("8")
        console.log(token, myUserName)
        await session.connect(token, { clientData: myUserName });
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
        var devices = await OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');
        var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        // Set the main video in the page to display our webcam and store our Publisher
        const response = {
          currentVideoDevice: currentVideoDevice,
          publisher: publisher,
        }
        /** 여기까지 */

        // setCurrentVideoDevice(currentVideoDevice);
        console.log("11")
        console.log(publisher)
        return response
        // return publisher
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

// 존재하는 방 찾아가는 로직인듯. 학생이 선생이 만든 방 들어갈때 사용?

// export const findRoom = createAsyncThunk('room/findRoom', async accessToken => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/room/quick`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.log(error)
//     // console.log('방이 존재하지 않습니다!, 방을 생성합니다.')
//   }
// })

export const switchCamera = createAsyncThunk(
  "video/switchCamera",
  async (data) => {
    const OV = data.OV
    const currentVideoDevice = data.currentVideoDevice
    const session = data.session
    const mainStreamManager = data.mainStreamManager

    try {
      const devices = await OV.getDevices()
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {

        var newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager)

          await session.publish(newPublisher)
          const response = {
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          }
          return response
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
)