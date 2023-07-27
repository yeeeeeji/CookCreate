import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateTime, setTimeTaken } from "../../store/lesson/lesson";

function LessonTime() {
  const [selectedDateTime, setSelectedDateTime] = useState(null); // 초기값을 null로 설정
  const [lessonTakenTime, setLessonTakenTime] = useState(60); // 과외 시간의 기본값 설정
  const dispatch = useDispatch();

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleTakenTime = (e) => {
    setLessonTakenTime(e.target.value);
  };

  useEffect(() => {
    if (selectedDateTime) {
      const isoDateTime = selectedDateTime.toISOString(); // ISO 8601 형식으로 변환
      dispatch(setDateTime(isoDateTime));
    }
    dispatch(setTimeTaken(lessonTakenTime));
  }, [dispatch, selectedDateTime, lessonTakenTime]);

  return (
    <div>
      <br />
      <DatePicker
        selected={selectedDateTime}
        onChange={handleDateTimeChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText='과외 일시'
      />
      <input 
        type="number" 
        min="60" max="240" step="10"
        placeholder='과외 시간'
        value={lessonTakenTime}
        onChange={handleTakenTime}
      />
    </div>
  );
}

export default LessonTime;
