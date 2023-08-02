import React from 'react';

function CoreFunction() {
  const commonStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    marginTop: '20px',
  };
  return (
    <div>
      <div style={commonStyle}>
        <div>
          체크
        </div>
        <div>
          체크 표시로 진행 상황을 확인할 수 있어요!
        </div>
      </div>
      <div style={commonStyle}>
        <div>
          손들기
        </div>
        <div>
          직접 손을 들어서 질문을 해보세요!
        </div>
      </div>
      <div style={commonStyle}>
        <div>
          타이머
        </div>
        <div>
          번거롭게 손을 씻지 않아도 타이머를 맞출 수 있어요!
        </div>
      </div>
    </div>
  );
}

export default CoreFunction;