import React from 'react';
import { useSelector } from 'react-redux';

function LessonSchedule() {
  const lessonDate = useSelector((state) => state.lessonInfo.lessonDate)
  const timeTaken = useSelector((state) => state.lessonInfo.timeTaken)

  const displayTime = (dateTime) => {
    if (!dateTime) return null;

    const localDate = new Date(dateTime);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC', // 시간대를 UTC로 설정
    };
    return localDate.toLocaleString(undefined, options);
  };

  return (
    <div style={{
      width: '300px',
      height: '100px',
      border: '1px solid #ccc'
    }}>
      <div>
        학습 일정
        {displayTime(lessonDate)}
      </div>
      <div>
        학습 시간
        {timeTaken}분
      </div>
    </div>
  );
}

export default LessonSchedule;
