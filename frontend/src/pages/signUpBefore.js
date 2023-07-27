import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { setUserType } from '../store/auth/auth';

function SignUpBefore() {
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const handleUserType = ( userType ) => {
    // dispatch(setUserType({ userType }))
    localStorage.setItem('userType', userType);

    navigate("/signup")
  }
  
  return (
    <div>
      <button onClick={() => handleUserType("COOKYER")}>
        Cookyer
        <br />
        회원가입
      </button>
      <button onClick={() => handleUserType("COOKIEE")}>
        Cookiee
        <br />
        회원가입
      </button>
    </div>
  );
}

export default SignUpBefore;