import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpBefore() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/signup")}>
        Cookyer
        <br />
        회원가입
      </button>
      <button onClick={()=>navigate("/signup")}>
        Cookiee
        <br />
        회원가입
      </button>
    </div>
  );
}

export default SignUpBefore;