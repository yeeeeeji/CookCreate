import React from 'react';

function IntroduceCookyer({cookyerName}) {
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