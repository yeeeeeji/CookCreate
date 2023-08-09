import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from "react-redux";
import '../../style/navbar.css'
import '../../style/video.css'
import AppliedLessonMenu from './AppliedLessonMenu';
import UserDropMenu from './UserDropMenu';

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
  const dropUserMenu = () => {
    console.log(!userDropdown)
    setUserDropdown((prev) => !prev)
  }

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <Link to='/' className='logo'>
          <img src= "/logo.png" alt="로고" className='logo' />
        </Link> 
        <Link to='/lesson'>
          수업 전체
        </Link>
        <SearchBar />
      </div>
      {isLogin ? (
        <div className="nav-cookyer">
          {role === 'COOKYER' ? <Link to='registerlesson'>과외 등록</Link> : null} 
          <span onClick={Logout}>로그아웃</span>
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
      <Link to='/chatroom'>
        채팅
      </Link>
      {/* {role === 'COOKYER' ? <button onClick={() => createRoom(5)}>쿠커화면</button> : null} */}
    </div>
  );
}

export default NavBar;
