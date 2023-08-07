import React from 'react';
import { useSelector } from 'react-redux';

function IntroduceCookyer() {
  const cookyerName = useSelector((state) => state.lessonInfo.cookyerName)
  return (
    <div style={{
      width : '300px',
      height : '100px',
      border: '1px solid #ccc'
    }}>
      <h3>강사 소개</h3>
      {cookyerName}
    </div>
  );
}

export default IntroduceCookyer;