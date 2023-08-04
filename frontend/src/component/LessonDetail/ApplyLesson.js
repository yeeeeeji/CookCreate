import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ApplyLesson({ price, jjimCount, lessonId, videoUrl, disable }) {
  console.log(disable)
  const access_token = useSelector((state) => state.auth.access_token)
  const [errMsg, setErrMsg] = useState('')
  const [payUrl, setPayUrl] = useState('')
  const [pg_token, setPg_Token] = useState('')

  const [showPopup, setShowPopup] = useState(false)


  const handleApply = () => {
    if (!disable) {
      axios.get(
        `/api/v1/pay/ready/${lessonId}`,
        {
          headers: {
            Access_Token: access_token
          }
        }
      )
      .then((res) => {
        setPayUrl(res.data.next_redirect_pc_url);
        const popupWindow = window.open(payUrl, '_blank', 'width=500, height=600');
        if (popupWindow) {
          // 새 창이 열렸을 경우에만 데이터 전달
          popupWindow.postMessage(res.data, window.location.origin);
        }
      })
      .catch((err) => {
        console.log(access_token);
        setErrMsg(err.response.data.message);
      });
    }
  };

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
    {showPopup && (
      <div>
        <div>
          <h3>팝업 제목</h3>
          <h6>팝업 내용</h6>
          <button onClick={() => setShowPopup(false)}>닫기</button>
        </div>
      </div>
    )}
  </div>
  );
}

export default ApplyLesson;
