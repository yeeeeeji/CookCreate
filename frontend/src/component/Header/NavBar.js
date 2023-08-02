import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from "react-redux";
import '../../style/navbar.css'
import axios from 'axios';

function NavBar() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.isLogin)
  const nickname = localStorage.getItem('nickname')
  const role = localStorage.getItem('role')
  const emoji = localStorage.getItem('emoji')
  const refreshToken = localStorage.getItem('refresh_token')
  const accessToken = localStorage.getItem('access_token')
  const Logout = () => {
    // dispatch(logout())
    axios.post(`api/v1/member/logout`, {}, {
      headers: {
        access_token : accessToken,
        refresh_token : refreshToken
      },
    })
    .then(() => {
      localStorage.clear()
      window.location.replace("/");
    })
    .catch((err) => {
      console.log(err)
      alert('로그아웃에 실패했습니다')
    });  
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className='navbar'>
      <Link to='/'>
        로고
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
