  import axios from 'axios';
  import React, { useState } from 'react';
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { login } from '../../store/auth/auth'
  import '../../style/auth/login.css';

  function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // 추가: 기억하기 체크 상태
    const [errMsg, setErrMsg] = useState('');
    const handleLogin = (e) => {
      e.preventDefault()
      axios.post(`api/v1/auth/login`, {userId, userPw})
      .then((res)=>{
        const { access_token, refresh_token } = res.headers;
        dispatch(login({
          access_token : res.headers.access_token, 
          refresh_token : res.headers.refresh_token,
          userId,
          nickname: res.data.nickname,
          role : res.data.role}));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        if (rememberMe) { // 추가: 아이디 기억하기 체크한 경우 로컬스토리지에 아이디 저장
          localStorage.setItem('remembered_userId', userId);
        } else {
          localStorage.removeItem('remembered_userId'); // 추가: 아이디 기억하기 체크를 해제한 경우 저장된 아이디 제거
        }

        navigate("/")
      })
      .catch((err) =>{
        setErrMsg("아이디 또는 비밀번호를 잘못 입력했습니다.")
      })
    }

    return (
      <div className='loginpage'>
        <div className='logintitleWrap'>
          로그인
        </div>
        <div className='logincontentWrap'>
            <div className='logininputTitle'>아이디</div>
            <div className='logininputWrap'>
              <input type="text"
                className='logininput'
                value={userId}
                onChange={(e)=>{
                  setUserId(e.target.value)
                }}
                placeholder='아이디'
                autoComplete="off"
              />
            </div>

            <div className="rememberMeContainer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className='rememberMeCheckbox'
                id='rememberMeCheckbox'
              />
              <label htmlFor='rememberMeCheckbox' className='rememberMeLabel'>
                아이디 기억하기
              </label>
            </div>

            <div className='logininputTitle'>비밀번호</div>
            <div className='logininputWrap'>
              <input type="password"
              className='logininput'
              value={userPw}
              onChange={(e) =>{
                setUserPw(e.target.value)
              }}
              placeholder='비밀번호'
              autoComplete="current-password"
              />
            </div>

            <div className='linkContainer'>
              <button className='linkButton' onClick={() => navigate('/forgot-username')}>
                아이디 찾기
              </button>
               | 
              <button className='linkButton' onClick={() => navigate('/reset-password')}>
                비밀번호 변경
              </button>
            </div>

          <div className="bottomBtnContainer">
            <button 
              onClick ={handleLogin} 
              className='loginbottomBtn'
            >로그인</button>
          </div>

          {errMsg}
        </div>
      </div>
    );
  }

  export default Login;