import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from "react-redux";
import '../../style/navbar.css'
import { logout } from '../../store/auth/auth'; // Import the logout action

function NavBar() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const nickname = localStorage.getItem('nickname')
  const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')

  const Logout = () => {
    dispatch(logout())

    window.location.replace("/")
  
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='navbar'>
      <Link to='/'>
        로고
      </Link> |
      <Link to='/mypageT'>
        마이페이지T
      </Link> |
      <Link to='/mypageS'>
        마이페이지S
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
      )}
    </div>
  );
}

export default NavBar;
