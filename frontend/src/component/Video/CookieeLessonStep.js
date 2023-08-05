import React from 'react';
import { useSelector } from 'react-redux';

function CookieeLessonStep() {
  const curStep = useSelector((state) => state.cookieeVideo.curStep)

  return (
    <div>
      <div>
        <p>현재 진행 단계</p>
        <div>
          {curStep ? (
            <p>{curStep}</p>
          ) : (
            <p>진행 단계</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CookieeLessonStep;