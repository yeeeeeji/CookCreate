import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from "react-redux";
import '../../style/navbar.css'
import { logout } from '../../store/auth/auth'; // Import the logout action
import { OpenVidu } from 'openvidu-browser';
import { initOVSession } from '../../store/video/video';

function NavBar() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const nickname = localStorage.getItem('nickname')
  // const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')

  const Logout = () => {
    dispatch(logout())
    window.location.replace("/")
  }

  const navigate = useNavigate()

  const session = useSelector((state) => state.video.session)
  const [join, setJoin] = useState(false)
  const [role, setRole] = useState(undefined)

  useEffect(() => {
    if (join) {
      const OV = new OpenVidu()
      const session = OV.initSession()
      console.log(1, join)
      dispatch(initOVSession({OV, session}))
    }
  }, [join])

  useEffect(() => {
    if (session && role) {
      navigate(`/videoLesson/${role}`)
    }
    // 쉽게 접근할 수 없게 url 세션아이디로 바꾸기??
  }, [session])

  const handleJoin = (role) => {
    setRole(role)
    setJoin(true)
    console.log(0)
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
      <button onClick={() => handleJoin("COOKYER")}>쿠커화면</button>
      <button onClick={() => handleJoin("COOKIEE")}>쿠키화면</button>
      {/* <Link to='/videoLesson'>화상수업</Link> */}
    </div>
  );
}

export default NavBar;
