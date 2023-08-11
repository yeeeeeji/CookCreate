import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ApplyLesson({ disable }) {
  const price = useSelector((state) => state.lessonInfo.price);
  const lessonId = useSelector((state) => state.lessonInfo.lessonId);
  const videoUrl = useSelector((state) => state.lessonInfo.videoUrl);
  const access_token = useSelector((state) => state.auth.access_token);
  const [errMsg, setErrMsg] = useState('');
  const [payUrl, setPayUrl] = useState('');
  const [popupWindow, setPopupWindow] = useState('')

  const handleApply = () => {
    if (!disable) {
      axios
        .post(`/api/v1/pay/ready/${lessonId}`, {}, {
          headers: {
            Access_Token: access_token,
          },
        })
        .then((res) => {
          setPayUrl(res.data.next_redirect_pc_url);
          const popupWindow = window.open( // 카카오페이 결제창 열림. 이전까지는 popupWindow false
            res.data.next_redirect_pc_url,
            '_blank',
            'width=500, height=600'
          );
          setPopupWindow(popupWindow)
        })
        .catch((err) => {
          setErrMsg(err.response.data.message);
        });
    }
  }

  useEffect(() => {
    if (popupWindow) {
      const timer = setInterval(() => {
        const searchParams = new URL(popupWindow.location.href).searchParams;
        const payStatus = searchParams.get('payStatus');
        if (payStatus === 'COMPLETED') {
          popupWindow.close();
          console.log('결제 성공');
          axios
            .post(`/api/v1/lesson/${lessonId}`, {}, {
              headers: {
                Access_Token: access_token
              }
            })
            .then((res) => {
              console.log(res);
              console.log('결제 후 신청 완료')
            })
            .catch((err) => {
              console.log(err);
            });
          clearInterval(timer);
        } else if (payStatus === 'CANCELLED' || payStatus === 'FAILED') {
          alert('다시 결제를 시도해주세요!');
          clearInterval(timer);
        }
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [popupWindow]);

  return (
    <div>
      {price}원
      <button onClick={handleApply}> 신청하기 </button>
      {errMsg && <div>{errMsg}</div>}
      <div>
        <a href={videoUrl}>
          수업 맛보기
        </a>
      </div>
      {/* {showPopup && (
        <div>
          <div>
            <h3>팝업 제목</h3>
            <h6>팝업 내용</h6>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ApplyLesson;
