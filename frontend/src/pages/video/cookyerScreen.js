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

  return (
    <div className='video-page'>
      <VideoSideBar/>
      <div>
        <VideoHeader/>
        <div>
          <div className='cookyer-sharing'>
            <div className='cookyer-sharing-content'>
              <span>화면공유</span>
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