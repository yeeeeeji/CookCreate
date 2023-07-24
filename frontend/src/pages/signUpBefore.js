import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

function SignUpBefore() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCookyerClick = () => {
    dispatch({type : "COOKYER", payload : "COOKYER"})
    navigate("/signup")
  }

  const handelCookieeClick = () => {
    dispatch({type : "COOKIEE", payload : "COOKIEE"})
    navigate("/signup")
  }
  return (
    <div>
      <button onClick={handleCookyerClick}>
        Cookyer
        <br />
        회원가입
      </button>
      <button onClick={handelCookieeClick}>
        Cookiee
        <br />
        회원가입
      </button>
    </div>
  );
}

export default SignUpBefore;