import React from 'react';
import { useSelector } from 'react-redux';

function LessonSchedule() {
  const lessonDate = useSelector((state) => state.lessonInfo.lessonDate)
  const timeTaken = useSelector((state) => state.lessonInfo.timeTaken)
  const today = new Date()
  const todayHours = today.getHours();
  const todayMinutes = today.getMinutes();
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
      <div>
        오늘 시간
        {todayHours}시 {todayMinutes}분
      </div>
    </div>
  );
}

export default LessonSchedule;