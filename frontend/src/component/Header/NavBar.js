import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from "react-redux";
import '../../style/navbar.css'
import { logout } from '../../store/auth/auth'; // Import the logout action
import { OpenVidu } from 'openvidu-browser';
import { initOVSession, setMySessionId } from '../../store/video/video';
import axios from 'axios';

function NavBar() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const access_token = useSelector((state) => state.auth.access_token)
  const refresh_token = useSelector((state) => state.auth.refresh_token)
  const nickname = localStorage.getItem('nickname')
  const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')

  const [ myLessons, setMyLessons ] = useState(undefined)

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

  const navigate = useNavigate()

  const session = useSelector((state) => state.video.session)

  // 수업 목록에서 생성하기 버튼을 클릭하면 세션이 생성되고 등등
  const createRoom = ( lessonId ) => {
    const OV = new OpenVidu()
    const session = OV.initSession()
    console.log(1)
    dispatch(initOVSession({OV, session}))  // 세션 만들어서 스토어에 저장 후

    axios.put(`api/v1/session/${lessonId}`,
    { sessionId: session.sessionId },
    {
      headers : {
        accessToken : access_token
      },
    })
    .then((res) => {
      console.log('db에 세션 아이디 저장 완료')
    })
    .catch((err) => {
      console.log(err)
      console.log('db에 세션 아이디 저장 실패')
    })
  }

  useEffect(() => {
    if (session && role) {
      navigate(`/videoLesson/${role}`)
    }
    // 쉽게 접근할 수 없게 url 세션아이디로 바꾸기??
  }, [session])

  useEffect(() => {  // 레슨 정보 받아오는 부분
    if (role === 'COOKIEE') {
      axios.get(`api/v1/my/applied`,
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

  // 반복문 이용해서 모달에 각각 정보 띄우고, 온클릭 이벤트를 통해 전달받는 방식
  const joinLesson = ( lessonId ) => {
    axios.get(`api/v1/session/${lessonId}`,
      {
        headers : {
          accessToken : access_token
        }
      })
      .then((res) => {
        console.log(res)
        console.log('세션 잘 받아와집니다')
        dispatch(setMySessionId(res.data)) // 토큰이랑 커넥션 설정하는걸로 바꾸기?
        // setSessionId(res.data.sessionId)
      })
      .catch((err) => {
        console.log(err)
        console.log('세션 로드 에러가 있습니다.')
      })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='navbar'>
      <Link to='/'>
        로고
      </Link> |
      <Link to='/lessonranking'>
        수업 랭킹
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
