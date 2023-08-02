import React from 'react';

function ReviewDetail({onClose}) {
  return (
    <div className="modal">
        <button onClick={onClose}>X</button>
      <div className="modal_content">
        <h3>강의제목</h3>
        <p>별점:</p>
        <p>선생님닉네임/아이디:</p>
        <p>작성자닉네임/아이디:</p>
        <p>작성자: </p>
        <p>리뷰내용</p>
        <p>작성날짜,수정날짜</p>
      </div>
    </div>
  );
}

export default ReviewDetail;