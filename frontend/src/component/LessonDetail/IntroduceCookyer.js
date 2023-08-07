import React from 'react';
import { useSelector } from 'react-redux';

function IntroduceCookyer() {
  const introduce = useSelector((state) => state.lessonInfo.introduce)
  return (
    <div style={{
      width : '300px',
      height : '100px',
      border: '1px solid #ccc'
    }}>
      <h3>강사 소개</h3>
      {introduce}
    </div>
  );
}

export default IntroduceCookyer;