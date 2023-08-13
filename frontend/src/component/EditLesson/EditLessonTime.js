import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { setTimeTaken, setTimeTakenVaild } from '../../store/lesson/lessonEdit';

function EditLessonTime() {
  const dispatch = useDispatch();
  const lessonDate = useSelector((state) => state.lessonInfo.lessonDate);
  const initTimeTaken = useSelector((state) => state.lessonInfo.timeTaken);
  const [lessonTakenTime, setLessonTakenTime] = useState(initTimeTaken);

  // 유효성 검사
  const dateValid = useSelector((state) => state.lessonEdit.dateValid);
  const timeTakenValid = useSelector((state) => state.lessonEdit.timeTakenValid);

  const handleTakenTime = (e) => {
    setLessonTakenTime(e.target.value);
    dispatch(setTimeTakenVaild(e.target.value !== ''));
    dispatch(setTimeTaken(e.target.value));
  };

  const formatAMPM = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${ampm} ${displayHours}:${displayMinutes}`;
  };

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(lessonDate));

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>과외 일시</h3>
          <h5>과외 일시는 수정할 수 없습니다.</h5>
          <div style={{ marginLeft: '5px' }}>{dateValid ? '✅' : '🔲'}</div>
        </div>
        <p>{formattedDate}</p>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>강의 시간</h3>
          <div style={{ marginLeft: '5px' }}>{timeTakenValid ? '✅' : '🔲'}</div>
        </div>
        <select value={lessonTakenTime} onChange={handleTakenTime}>
          <option value="">-</option>
          <option value="60">60분</option>
          <option value="90">90분</option>
          <option value="120">120분</option>
          <option value="150">150분</option>
          <option value="180">180분</option>
          <option value="210">210분</option>
          <option value="240">240분</option>
        </select>
      </div>
    </div>
  );
}

export default EditLessonTime;
