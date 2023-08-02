import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from "react-redux";
import '../../style/navbar.css'
import { logout } from '../../store/auth/auth'; // Import the logout action
import { setOvToken } from '../../store/video/video';
import axios from 'axios';

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const access_token = useSelector((state) => state.auth.access_token)
  const refresh_token = useSelector((state) => state.auth.refresh_token)
  const nickname = localStorage.getItem('nickname')
  const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')

  const OvToken = useSelector((state) => state.video.OvToken)
  const [ roomPresent, setRoomPresent ] = useState(null) // 선생님만 사용하는 변수

  const [ myLessons, setMyLessons ] = useState(undefined)  // 학생 모달창에 불러서 쓸 레슨 정보

  const Logout = () => {
    console.log(access_token, refresh_token)
    axios.post(`api/v1/member/logout`, {
      headers : {
        access_token : access_token,
        refresh_token : refresh_token
      }
    })
    .then(() => {
      console.log('로그아웃 api 테스트')
      dispatch(logout())
      window.location.replace("/")
    })
    .catch((err) => {
      console.log('에러 어디서 나니')
      console.log(access_token, refresh_token)
      console.log(err)
    })
  }

  /* 선생님이 과외방 생성하는 코드 */
  // 선생님 마이페이지 생기면 옮기기
  const session = useSelector((state) => state.video.session)

  // 수업 목록에서 생성하기 버튼을 클릭하면 세션이 생성되고 등등
  const createRoom = ( lessonId ) => {
    // 1. 선생님이 해당 수업 방 만들기 요청 보내기
    axios.post(
      `api/v1/session/create`,
      { lessonId },
      {
        headers: {
          accessToken: access_token
        }
      })
      .then((res) => {
        setRoomPresent(lessonId)
        console.log('방 만들기 요청 성공', res)
        // dispatch(setMySessionId(res.data)) // 토큰이랑 커넥션 설정하는걸로 바꾸기?
      })
      .catch((err) => {
        console.log('방 만들기 요청 실패', err)
      })
  }

  // 2. 방이 만들어지면 토큰 요청하기
  useEffect(() => {
    if (roomPresent !== null) {
      axios.post(
        `api/v1/session/connect`,
        { lessonId: roomPresent },
        {
          headers: {
            accessToken: access_token
          }
        })
        .then((res) => {
          console.log('쿠커 토큰 생성 성공', res.data)
          const token = res.data
          dispatch(setOvToken(token))
        })
        .catch((err) => {
          console.log('쿠커 토큰 생성 실패', err)
        })
    }
  }, [roomPresent])

  // // 3.  토큰이 생기면 OV와 session 객체 만들기
  // useEffect(() => {
  //   const OV = new OpenVidu()
  //   const session = OV.initSession()
  //   console.log(1)
  //   dispatch(initOVSession({OV, session}))  // 세션 만들어서 스토어에 저장 후 -> 꼭 저장해야 하는지 확인하기
  // }, [OvToken])

  // // 4. 세션이 생기면 이동 -> OV객체, session객체(비어있음), 토큰이 있는 상태
  // useEffect(() => {
  //   if (session) {
  //     navigate(`/videoLesson/${role}`)
  //   }
  // }, [session])

  // **3. 토큰이 생기면 이동 -> 페이지 이동 후 발행 과정에서 OV, session 객체 생성
  useEffect(() => {
    if (OvToken) {
      navigate(`/videoLesson/${role}`)
    }
  }, [OvToken])


  useEffect(() => {  // 레슨 정보 받아오는 부분
    if (role === 'COOKIEE') {
      axios.get(
        `api/v1/my/applied`,
        {
          headers : {
            accessToken : access_token
          }
        })
        .then((res) => {
          console.log(res)
          console.log('신청한 수업 목록 받아와짐')
          setMyLessons(res.data) // 토큰이랑 커넥션 설정하는걸로 바꾸기?
          // setSessionId(res.data.sessionId)
        })
        .catch((err) => {
          console.log(err)
          console.log('신청한 수업 목록 안받아와짐')
        })
    }
  }, [])

  /** 학생이 과외방 입장하는 코드 */
  // 반복문 이용해서 모달에 각각 정보 띄우고, 온클릭 이벤트를 통해 전달받는 방식

  // 1. 입장 요청해서 토큰 받아오기
  const joinLesson = ( lessonId ) => {
    axios.get(
      `api/v1/session/connect`,
      { lessonId },
      {
        headers : {
          accessToken : access_token
        }
      })
      .then((res) => {
        console.log('쿠키 토큰 생성 성공', res.data)
        const token = res.data
        dispatch(setOvToken(token))
      })
      .catch((err) => {
        console.log('쿠키 토큰 생성 실패', err)
      })
  }
  
  // 2. 토큰이 생기면 OV와 session 객체 만들기
  // 3. 세션이 생기면 페이지 이동하기
  // 선생님 부분에 코드 있음

  // // // 서버에서 커넥션 객체를 반환한다는 가정으로, 실행하는 코드
  // // useEffect(() => {
  // //   if (role === 'COOKIEE' && mySessionId) {
  // //     const cookieeOV = new OpenVidu()
  // //     const cookieeSession = cookieeOV.initSession()
  // //     cookieeSession.connect(connection.token)
  // //       .then(() => {
  // //         console.log("선생님 세션에 학생 정상 연결")
  // //       })
  // //       .catch((err) => {
  // //         console.log("선생님 세션에 연결 실패", err)
  // //       })
  // //   }
  // // }, [connection])

  // // 서버에서 세션아이디 주고받기만 가능하다면
  // const createConnection = async (mySessionId) => {  // 쿠키만 쓰는 함수
  //   try {
  //     const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

  //     const response = await axios.post(
  //       `${APPLICATION_SERVER_URL}api/sessions/${mySessionId}/connections`,
  //       {},
  //       {
  //         headers: {
  //           // Authorization:
  //           //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         }
  //       },
  //     )
  //     console.log(response.data, "쿠키 커넥션?")
  //     dispatch(setCookieeConnection(response.data))
  //   } catch (err) {
  //     console.log('커넥션 얻기 실패', err)
  //   }
  // }

  // useEffect(() => {
  //   if (mySessionId) {
  //     createConnection(mySessionId)
  //   }
  // }, [mySessionId])

  // useEffect(() => {
  //   if (role === 'COOKIEE' && cookieeConnection) {  // 학생은 커넥션이 생성되면 페이지 이동
  //     navigate(`/videoLesson/${role}`)
  //   }
  //   // if (cookieeConnection) {
  //   //   publishCookiee()
  //   // }
  // }, [cookieeConnection])

  // // 쿠키 발행
  // const publishCookiee = async () => {
  //   console.log("publishCookiee")
  //   const cookieeOV = new OpenVidu()
  //   const cookieeSession = cookieeOV.initSession()
  //   dispatch(initOVSession({OV: cookieeOV, session: cookieeSession}))

  //   const cookieePublisher = await cookieeOV.initPublisherAsync(undefined, {
  //     audioSource: undefined, // The source of audio. If undefined default microphone
  //     videoSource: undefined, // The source of video. If undefined default webcam
  //     publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //     publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //     resolution: '640x480', // The resolution of your video
  //     frameRate: 30, // The frame rate of your video
  //     insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //     mirror: false, // Whether to mirror your local video or not
  //   })

  //   console.log("쿠키 퍼블리셔 만들어졌나?", cookieePublisher)
  //   await cookieeSession.publish(cookieePublisher)

  //   dispatch(setPublisher(cookieePublisher))
  // }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='navbar'>
      <Link to='/'>
        로고
      </Link> |
      <Link to='/totallessons'>
        수업 전체
      </Link>
      
      <SearchBar/>
      <Link to = '/login'>
        로그인
      </Link> |
      <Link to ='/signupbefore'>
        회원가입
      </Link>
      <SearchBar />
      {isLogin ? (
        <div>
          {role} {emoji}
          {nickname}님, 안녕하세요!
          {/* 쿠커들에게만 보입니다. */}
          {role === 'COOKYER' ? <Link to='registerlesson'>과외 등록</Link> : null} 
          <span onClick={Logout}>로그아웃</span>
      </div>
      ) : (
        <React.Fragment>
          <Link to='/login'>
            로그인
          </Link> |
          <Link to='/signupbefore'>
            회원가입
          </Link>
        </React.Fragment>
      )} | 
      {role === 'COOKYER' ? <button onClick={() => createRoom(1)}>쿠커화면</button> : null}
      {role === 'COOKIEE' ? <button onClick={() => joinLesson(1)}>쿠키화면</button> : null}
    </div>
  );
}

export default NavBar;
