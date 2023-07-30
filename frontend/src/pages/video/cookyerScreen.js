import React, { useEffect } from 'react';
import VideoSideBar from '../../component/Video/VideoSideBar';
import VideoHeader from '../../component/Video/VideoHeader';
import UserVideoComponent from '../../component/Video/UserVideoComponent';
import Timer from '../../component/Video/Timer';
import LessonStepWidget from '../../component/Video/LessonStepWidget';

import '../../style/video.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscriber, enteredSubscriber, setMainStreamManager } from '../../store/video/video';
import { joinSession } from '../../store/video/video-thunk';

function CookyerScreen() {
  const dispatch = useDispatch()
  
  const OV = useSelector((state) => state.video.OV)
  const session = useSelector((state) => state.video.session)
  const mySessionId = useSelector((state) => state.video.mySessionId)
  // const myUserName = useSelector((state) => state.video.myUserName)  // 닉네임으로 바꾸기
  const myUserName = 'cookyer'
  const publisher = useSelector((state) => state.video.publisher)
  const mainStreamManager = useSelector((state) => state.video.mainStreamManager)  // 선생님으로 고정하는 방법 찾기
  const subscribers = useSelector((state) => state.video.subscribers)

  // const role = localStorage.getItem('role')

  // /** 화면공유 도전 */
  // const connectionId = useSelector((state) => state.screenShare.connectionId)
  // const audioActive = useSelector((state) => state.screenShare.audioActive)
  // const videoActive = useSelector((state) => state.screenShare.videoActive)
  // const screenShareActive = useSelector((state) => state.screenShare.screenShareActive)
  // const nickname = useSelector((state) => state.screenShare.nickname)
  // const streamManager = useSelector((state) => state.screenShare.streamManager)
  // const type = useSelector((state) => state.screenShare.type)
  // const [ isShared, setIsShared ] = useState(false)
  // /** 화면공유 도전 */

  useEffect(() => {
    console.log(3, session)
    if (session) {
      // console.log("세션 바뀜")
      // On every new Stream received...
      const handleStreamCreated = (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        dispatch(enteredSubscriber(subscriber))
      };

      // On every Stream destroyed...
      const handleStreamDestroyed = (event) => {
        dispatch(deleteSubscriber(event.stream.streamManager))
      };

      // On every asynchronous exception...
      const handleException = (exception) => {
        console.warn(exception);
      };

      session.on('streamCreated', handleStreamCreated);
      session.on('streamDestroyed', handleStreamDestroyed);
      session.on('exception', handleException);

      console.log(4)
      const role = 'cookyer'
      dispatch(joinSession({OV, session, mySessionId, myUserName, role}))

      console.log(5)

      // Clean-up 함수 등록
      return () => {
        session.off('streamCreated', handleStreamCreated);
        session.off('streamDestroyed', handleStreamDestroyed);
        session.off('exception', handleException);
        const mySession = session;
        if (mySession) {
          mySession.disconnect(); // 예시에서는 disconnect()로 대체하였으나, 이는 OpenVidu에 따라 다르게 적용될 수 있음
        }
      };
    }
  }, []);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      dispatch(setMainStreamManager({publisher: stream}))
    }
  }

  // /** 화면공유 도전 */
  // const handleIsShared = () => {
  //   setIsShared((prev) => !prev)
  // }

  // useEffect(() => {
  //   if (isShared) {

  //   } else {
  //     session.unpublish(streamManager)
  //   }
  // }, [isShared])


  // const screenShare = () => {
  //   console.log("이게 실행됐다고????")
  //   const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
  //   const publisher = OV.initPublisher(
  //     undefined,
  //     {
  //       videoSource: videoSource,
  //       publishAudio: true,
  //       publishVideo: true,
  //       mirror: false,
  //     },
  //     (error) => {
  //       if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
  //         alert('screen extension not installed')
  //           // this.setState({ showExtensionDialog: true });
  //       } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
  //           alert('Your browser does not support screen sharing');
  //       } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
  //           alert('You need to enable screen sharing extension');
  //       } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
  //           alert('You need to choose a window or application to share');
  //       }
  //     },
  //   )

  //   publisher.once('accessAllowed', () => {
  //     // session.unpublish(streamManager);
  //     dispatch(setStreamManager({publisher}))
  //     session.publish(streamManager).then(() => {
  //       dispatch(setScreenShareActive(true));
  //       sendSignalUserChanged({ isScreenShareActive: screenShareActive });
  //     });
  //   });
  //   // publisher.on('streamPlaying', () => {
  //   //     this.updateLayout();
  //   //     publisher.videos[0].video.parentElement.classList.remove('custom-class');
  //   // });
  // }

  // const sendSignalUserChanged = (data) => {
  //   const signalOptions = {
  //     data: JSON.stringify(data),
  //     type: 'userChanged',
  //   }
  //   session.signal(signalOptions)
  // }

  /** 화면공유 도전 */

  return (
    <div className='video-page'>
      <VideoSideBar/>
      <div>
        <VideoHeader/>
        <div>
          <div className='cookyer-sharing'>
            <div className='cookyer-sharing-content'>
              <span>화면공유</span>
              {/* {streamManager === null ? (
                <span>화면공유</span>
              ) : (
                // <UserVideoComponent
                //   videoStyle='cookyer-sharing-content'
                //   streamManager={streamManager}
                // />
              )} */}
            </div>
          </div>
          {/* <div className='cookyer-sharing' onClick={() => handleMainVideoStream(publisher)}>
            <UserVideoComponent
              videoStyle='cookyer-sharing-content'
              streamManager={publisher}
            />
          </div> */}
          <div className='cookyer-cookiees'>
            {/* {subscribers} */}
            {subscribers.map((sub, i) => (
              <div key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                {/* <span>{sub.id}</span> */}
                <UserVideoComponent
                  videoStyle='cookyer-cookiee'
                  streamManager={sub}
                />
              </div>
            ))}
          </div>
          <div className='cookyer'>
            <UserVideoComponent
              videoStyle='cookyer-video'
              streamManager={publisher}
            />
          </div>
          <Timer role='COOKYER'/>
          <LessonStepWidget/>
        </div>
      </div>
    </div>
  );
}

export default CookyerScreen;