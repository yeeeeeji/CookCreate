import React, { useState } from 'react';

function LessonStepWidget() {

  return (
    <div>
      <div>
        <p>현재 진행 단계</p>
        <div>
          <button>이전</button>
          <div>
            <p>강사가 미리 설정한 요리 단계</p>
            <button>수정</button>
          </div>
          <button>이후</button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default LessonStepWidget;