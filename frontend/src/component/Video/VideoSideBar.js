import React, { useEffect, useState } from 'react';

import '../../style/video.css'
import { useDispatch, useSelector } from 'react-redux';
import { audioMute, leaveSession, videoMute } from '../../store/video/video';
import { useNavigate } from 'react-router-dom';

function VideoSideBar() {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const session = useSelector((state) => state.video.session)

  const handleLeaveSession = () => {
    if (session) {
      session.disconnect()
      dispatch(leaveSession())
    }
    navigator('/')
  }

  const setVideoMute = () => {
    dispatch(videoMute())
  }

  const setAudioMute = () => {
    dispatch(audioMute())
  }

  useEffect(() => {
    // componentDidMount
    window.addEventListener('beforeunload', onbeforeunload);

    // componentWillUnmount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (e) => {
    leaveSession()
  }

  return (
    <div className='video-sidebar'>
      <button
        onClick={handleLeaveSession}
      >
        나가기
      </button>
      <button
        onClick={setAudioMute}
      >
        음소거
      </button>
      <button
        onClick={setVideoMute}
      >
        화면뮤트
      </button>
      <button>
        화면공유
      </button>
      <button>
        체크
      </button>
      <button>
        볼륨
      </button>
      <button>
        학생소리
      </button>
    </div>
  );
}

export default VideoSideBar;