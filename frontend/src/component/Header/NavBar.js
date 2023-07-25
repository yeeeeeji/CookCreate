import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import '../../style/navbar.css'
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.userinfo.isLogin)
  const nickname = useSelector((state) => state.userinfo.nickname)
  const role = useSelector((state) => state.userType).userType;

  const Logout = () => {
    dispatch({type : "LOGOUT"})
    localStorage.removeItem('access_token')
    localStorage.removeItem('nickname')
    navigate("/")
    
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
      {isLogged ? (
        <div>
          {role}
          {nickname}님, <span onClick={Logout}>로그아웃</span>
          <Link to='registerlesson'>과외 등록</Link>
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
