import React from 'react';

function CookieeNumber({remaining, maximum}) {
  const maximumInt = parseInt(maximum)
  const remainingInt = parseInt(remaining)
  const currentInt = maximumInt - remainingInt
  return (
    <div>
      <div style={{
        width : '300px',
        height : '100px',
        border: '1px solid #ccc'
      }}>
        <h4>
          수강 인원
        </h4>
        <div>
          {currentInt}명 / {maximumInt}명
        </div>
      </div>
    </div>
  );
}

export default CookieeNumber;