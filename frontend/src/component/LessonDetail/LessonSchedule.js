import React from 'react';
import { useSelector } from 'react-redux';
import '../../style/lesson/lesson-schedule-css.css';

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
      // second: '2-digit',
      // timeZone: 'UTC', // 시간대를 UTC로 설정 (한국 시간으로 하는게 맞는 거 같다)
    };
    return localDate.toLocaleString(undefined, options);
  };

  return (
    <div className='lessonScheduleContainer'>
      <div className='lessonScheduleRowContainer'>
        <div className='lessonScheduleFirstTitle'>학습 일정</div>
        <div className='lessonScheduleFirstDesc'>{displayTime(lessonDate)}</div>
      </div>
      <div className='lessonScheduleRowContainer'>
        <div className='lessonScheduleSecondTitle'>학습 시간</div>
        <div className='lessonScheduleSecondDesc'>{timeTaken}분</div>
      </div>
    </div>
  );
}

export default LessonSchedule;
