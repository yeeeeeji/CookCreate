import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoToGesture() {
  const navigate = useNavigate();
  const gotoGesture = () => {
    navigate("/gestureTest");
  }
  const style = {
    borderRadius: '3.125rem',
    border: '0.7px solid #8D9193',
    backgroundColor: '#FFFFFF',
    display: 'inline-flex',
    padding: '0.6rem 1.7rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.625rem',
    color: '#656363',
    fontSize: '1rem',
    fontWeight: '400',
    marginTop: '1.5rem'
  }
  return (
    <div>
      <button onClick={gotoGesture} style={style}>제스처 동작 체험 해보기</button>
    </div>
  );
}

export default GoToGesture;