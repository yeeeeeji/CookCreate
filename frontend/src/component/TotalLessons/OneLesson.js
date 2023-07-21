import React from 'react';

function OneLesson() {
  const squareStyle = {
    width: '100px', // 사각형의 너비를 100px로 설정
    height: '100px', // 사각형의 높이를 100px로 설정
    backgroundColor: 'gray', // 배경색을 빨간색으로 설정
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={squareStyle}>
      레슨 하나
    </div>
  );
}

export default OneLesson;