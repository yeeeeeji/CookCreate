import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ApplyLesson({ price, jjimCount, lessonId, videoUrl }) {
  const userType = localStorage.getItem('role');
  const access_token = useSelector((state) => state.auth.access_token)
  const handleApply = () => {
    axios.post(
      `/api/v1/lesson/${lessonId}`, {}, {
        headers : {
          Access_Token : access_token
        }
      }
    )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div style={{
      width : '300px',
      height : '150px',
      border: '1px solid #ccc'
    }}>
      {price}원
      <div
        style={{
          width: '200px',
          height: '40px',
          backgroundColor: userType === 'COOKYER' ? '#ccc' : 'orange',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          cursor: userType !== 'COOKYER' ? 'pointer' : 'not-allowed',
        }}
        disabled={userType === 'COOKYER'}
        onClick={handleApply}
      >
        신청하기
      </div>
      <div style={{ display: 'flex' }}>
        <Link to={videoUrl}>
          수업 맛보기 |
        </Link>
        <div>
          🧡 {jjimCount}
        </div>
      </div>
    </div>
  );
}

export default ApplyLesson;
