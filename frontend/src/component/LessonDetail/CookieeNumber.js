import React from 'react';
import { useSelector } from 'react-redux';

function CookieeNumber() {
  // console.log('안녕')
  const maximum = parseInt(useSelector((state) => state.lessonInfo.maximum))
  const remaining = parseInt(useSelector((state) => state.lessonInfo.remaining))
  const current = maximum - remaining
  // const remainingInt = parseInt(remaining)
  // const currentInt = maximumInt - remainingInt
  return (
    <div>
      {current} {remaining}
      <div style={{
        width : '300px',
        height : '100px',
        border: '1px solid #ccc'
      }}>
        <h4>
          수강 인원
        </h4>
        <div>
          {current}명 / {maximum}명
        </div>
      </div>
    </div>
  );
}

export default CookieeNumber;