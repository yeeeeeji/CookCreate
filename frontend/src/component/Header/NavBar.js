import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function NavBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to ='/'>
        로고
      </Link> |
      <Link to = '/lessonranking'>
        수업 랭킹
      </Link> |
      <Link to ='/totallessons'>
        수업 전체
      </Link>
      
      <SearchBar/>
      <Link to = '/login'>
        로그인
      </Link> |
      <Link to ='/signupbefore'>
        회원가입
      </Link>
    </div>
  );
}
export default NavBar;