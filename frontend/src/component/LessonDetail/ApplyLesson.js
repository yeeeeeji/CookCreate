import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ApplyLesson({ price, jjimCount, lessonId, videoUrl, disable }) {
  console.log(disable)
  const userType = localStorage.getItem('role');
  const access_token = useSelector((state) => state.auth.access_token)
  const [errMsg, setErrMsg] = useState('')
  const [payUrl, setPayUrl] = useState('')
  const [pg_token, setPg_Token] = useState('')
  const handleApply = () => {
    if (!disable) {
      axios.get(
        `/api/v1/pay/ready/${lessonId}`, {
          headers : {
            Access_Token : access_token
          }
        }
      )
      .then((res) => {
        console.log(res)
        setPayUrl(res.data.next_redirect_pc_url)
      })
      .catch((err) => {
        console.log(access_token)
        setErrMsg(err.response.data.message)
      })
    }

    }
  return (
    <div style={{
      width : '300px',
      height : '150px',
      border: '1px solid #ccc'
    }}>
      {price}원
      <button
        style={{
          width: '200px',
          height: '40px',
          backgroundColor: disable ? '#ccc' : 'orange',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          cursor: disable ? 'not-allowed' : 'pointer',
        }}
        onClick={handleApply}
      >
        신청하기
      </button>
    {errMsg}

    <div style={{ display: 'flex' }}>
      <Link to={videoUrl}>
        수업 맛보기 |
      </Link>
      <div>
        🧡 {jjimCount}
      </div>
    </div>
    <a href={payUrl}>
        결제
    </a>
  </div>
  );
}

export default ApplyLesson;
