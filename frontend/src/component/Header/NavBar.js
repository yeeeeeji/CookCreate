import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from "react-redux";
import '../../style/navbar.css'
import '../../style/video.css'
import AppliedLessonMenu from './AppliedLessonMenu';
import UserDropMenu from './UserDropMenu';
import { RiArrowDropDownLine } from 'react-icons/ri'

function NavBar() {
  const isLogin = useSelector((state) => state.auth.isLogin)

  const nickname = localStorage.getItem('nickname')
  const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')

  /** 신청 수업 드롭다운 */
  const [ lessonDropdown, setLessonDropdown ] = useState(false)

  /** 유저 드롭다운 */
  const [ userDropdown, setUserDropdown ] = useState(false)

  /** 쿠키 신청 메뉴 드롭다운 */
  const dropLessonMenu = () => {
    console.log(!lessonDropdown)
    setLessonDropdown((prev) => !prev)
  }

  /** 유저 메뉴 드롭다운 */
  const dropUserMenu = (data) => {
    console.log(!userDropdown)
    setUserDropdown(data)
    // setUserDropdown((prev) => !prev)
  }

  const location = useLocation();
  const mainPageStyle = location.pathname === '/';

  return (
    <div className={`navbar ${mainPageStyle ? 'navbar-main' : ''}`}>
      <div className="leftNav">
        <Link to='/' className='logo'>
          <img src= "/logo.png" alt="로고" className='logo' />
        </Link> 
        <Link to='/lesson'>
          수업 전체
        </Link>
        <SearchBar />
      </div>
      {isLogin ? (
        <div className="rightNav">
          <Link to='/chatroom' >채팅</Link>
          <div className="nav-lesson">
            {role === 'COOKYER' ? <Link to='registerlesson'>과외 등록</Link> : null} 
            {role === 'COOKIEE' ? (
            <div className='dropdown'>
                <button role="link" className='drop-btn' onClick={dropLessonMenu}>신청수업</button>
                <RiArrowDropDownLine className="dropdown-icon"/>
              { lessonDropdown ? (
                <div onMouseLeave={() => dropLessonMenu(false)} className="drop-wrap">
                  <AppliedLessonMenu />
                </div>
              ) : null}
            </div>
        ) : null}
            <div onClick={() => dropUserMenu(true)} className="nav-user">
              {emoji}{nickname}님
              <RiArrowDropDownLine className="dropdown-icon" />
            { userDropdown ? (
              <div onMouseLeave={() => dropUserMenu(false)} className="drop-wrap">
                <UserDropMenu/>
              </div>
            ) : null}
              {/* 쿠커들에게만 보입니다. */}
            </div>
          </div>
        </div>
        
      ) : (
          <React.Fragment>
            <div>
              <Link to='/login'>
                로그인
              </Link> 
              <Link to='/signupbefore'>
                회원가입
              </Link>
            </div>
        </React.Fragment>
      )} 
      {/* {role === 'COOKYER' ? <button onClick={() => createRoom(5)}>쿠커화면</button> : null} */}
    </div>
  );
}

export default NavBar;
