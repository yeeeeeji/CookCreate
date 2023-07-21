import React from 'react';

function GoToGesture() {
  const gotoGesture = () => {
    console.log('제스처 체험 해보는 곳. 아직 구현 안 했어요')
  }
  return (
    <div>
      <button onClick={gotoGesture}>제스처 동작 체험 해보기</button>
    </div>
  );
}

export default GoToGesture;