import React from 'react';

function LessonSchedule({timeTaken, lessonDate}) {
  return (
    <div style={{
      width : '300px',
      height : '100px',
      border: '1px solid #ccc'
    }}>      
      <div>
        학습 일정
        {lessonDate}
      </div>
      <div>
        학습 시간
        {timeTaken}분
      </div>
    </div>
  );
}

export default LessonSchedule;