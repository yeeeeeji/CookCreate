import React, { useState } from 'react';
import axios from 'axios';
function Signup() {
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userPwCk, setUserPwCk] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userEmail, setUserEmail] = useState('')

  //오류 메세지 저장
  const [userIdMessage, setUserIdMessage] = useState('')
  const [userPwMessage, setUserPwMessage] = useState('')
  const [userPwCkMessage, setUserPwCkMessage] = useState('')
  const [userNickNameMessage, setUserNickNameMessage] = useState('')
  const [userPhoneNumberMessage, setUserPhoneNumberMessage] = useState('')
  const [userEmailMessage, setUserEmailMessage] = useState('')

  //유효성 검사
  const [isUserId, setIsUserId] = useState(false)
  const [isUserPw, setIsUserPw] = useState(false)
  const [isUserPwCk, setIsUserPwCk] = useState(false)
  const [isNickName, setIsNickName] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [isUserEmail, setIsUserEmail] = useState(false)

  const onChangeUserId = (e) => {
    setUserId(e.target.value)
    if (userId.length < 4 || userId.length > 10) {
      setUserIdMessage('4글자 이상 10글자 이하로 입력해주세요')
      // 중복 로직 구현해야 함
      setIsUserId(false)
    } else {
      setUserIdMessage('올바른 아이디입니다! 🤗')
      setIsUserId(true)
    }
  }
  const onChangeUserPw = (e) => {
    setUserPw(e.target.value)
    if (userPw.length < 4 || userPw.length > 16) {
      setUserPwMessage('4글자 이상 16글자 이하로 입력해주세요')
      setIsUserPw(false)
    } else {
      setUserPwMessage('형식이 올바른 비밀번호입니다!')
      setIsUserPw(true)
    }
  }
  const onChangeUserPwCk = (e) => {
    setUserPwCk(e.target.value)
    if (userPw === userPwCk) {
      setUserPwCkMessage('비밀번호가 동일합니다! 😊')
      setIsUserPwCk(true)
    } else {
      setUserPwCkMessage('비밀번호가 틀립니다!')
      setIsUserPwCk(false)
    }
  }
  const onChangeUserNickName = (e) => {
    setNickName(e.target.value)
    // 중복 로직 구현 필요
  }
  const onChangeUserPhonenumber = (e) => {
    setPhoneNumber(e.target.value)
    //휴대폰 인증 필요
  }

  const onChangeUserEmail = (e) => {
    setUserEmail(e.target.value)
    const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (emailRegex.test(userEmail)) {
      setIsUserEmail(true)
      setUserEmailMessage('올바른 이메일 형식입니다!')
    } else {
      setIsUserEmail(false)
      setUserEmailMessage('올바른 이메일 형식을 입력하세요')
    }
  }

  const idDupliCheck = () => {
    console.log('중복체크 api 처리해야')
  }
  const nicknameDupliCheck = () => {
    console.log('중복체크 api 처리해야')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    axios
    .post(`api/v1/auth/signup`, 
    {userId, userPw, userPwCk, nickName, phoneNumber, userEmail})
    .then((res) => {
      console.log(res)
      console.log('회원가입 완료!')
    })
    .catch((err) =>{
      console.log(err)
    })
    }
    return (
    <div className='page'>
      <div className='titleWrap'>
        회원가입을 <br />
        진행합니다.
      </div>
      <div className='contentWrap'>
        <div className='inputTitle'>아이디</div>
        <div className='inputWrap'>
          <input type="text" className='input'
          value={userId}
          onChange={
            onChangeUserId
          }
          placeholder='아이디'/>
          <button onClick={idDupliCheck}>중복 확인</button>
          <div>
            {userIdMessage}
          </div>
        </div>

        <div className='inputTitle'>비밀번호</div>
        <div className='inputWrap'>
          <input type="password" className='input'
          value={userPw}
          onChange={
            onChangeUserPw
          }
          placeholder='비밀번호'
          />
          <div>
            {userPwMessage}
          </div>
        </div>
            
        <div className='inputTitle'>비밀번호 확인</div>
        <div className='inputWrap'>
          <input type="password" className='input'
          value={userPwCk}
          onChange={
            onChangeUserPwCk
          }
          placeholder='비밀번호 확인'
          />
          <div>
            {userPwCkMessage}
          </div>
        </div>


        <div className='inputTitle'>닉네임</div>
        <div className='inputWrap'>
          <input type="nickname" className='input'
          value={nickName}
          onChange={
            onChangeUserNickName
          }
          placeholder='닉네임'/>
          <button onClick={nicknameDupliCheck}>중복확인</button>
          <div>
            {userNickNameMessage}
          </div>
        </div>

        <div className='inputTitle'>전화번호 입력</div>
        <div className='inputWrap'>
          <input type="phonenumber" className='input'
          value={phoneNumber}
          onChange={
            onChangeUserPhonenumber
          }
          placeholder='전화번호 입력'/>
          <div>
            {userPhoneNumberMessage}
          </div>
        </div>

        <div className='inputTitle'>이메일</div>
        <div className='inputWrap'>
          <input type="email" className='input'
          value={userEmail}
          onChange={
            onChangeUserEmail
          }
          placeholder='이메일'/>
          <div>
            {userEmailMessage}
          </div>
        </div>

        <br/>

        <button onClick={handleSignup}
          className="bottomBtn"
          // disabled={!(isNickName && isPhoneNumber && isUserEmail && isUserId && isUserPw && isUserPwCk)}
          >
            회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
