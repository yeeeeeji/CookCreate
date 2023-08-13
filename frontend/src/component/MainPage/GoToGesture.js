import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoToGesture() {
  const navigate = useNavigate();
  const gotoGesture = () => {
    navigate("/gestureTest");
  }
  return (
    <div>
      <button onClick={gotoGesture}>제스처 동작 체험 해보기</button>
    </div>
  );
}

export default GoToGesture;