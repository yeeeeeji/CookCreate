import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateTime, setDateValid, setTimeTaken, setTimeTakenVaild } from "../../store/lesson/lesson";
import '../../style/lesson/lessonTimeCss.css';

function LessonTime() {
  const dispatch = useDispatch()

  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [lessonTakenTime, setLessonTakenTime] = useState("");
  const reduxTimeTaken = useSelector((state) => state.lesson.timeTaken)

  const dateValid = useSelector((state) => state.lesson.dateValid);
  const timeTakenValid = useSelector((state) => state.lesson.timeTakenValid);
  
  const handleDateTimeChange = (date) => {
    // 변환된 시간을 표준시(UTC)로 변환
    const utcDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    
    setSelectedDateTime(date);
    dispatch(setDateTime(utcDateTime)); // 변환된 값을 Redux에 저장
  };

  const handleTakenTime = (e) => {
    const selectedValue = e.target.value;
    setLessonTakenTime(selectedValue);
    dispatch(setTimeTaken(selectedValue));
  };
  
  useEffect(() => {
    setLessonTakenTime(reduxTimeTaken);
    dispatch(setTimeTakenVaild(lessonTakenTime !== 0))
  }, [reduxTimeTaken, lessonTakenTime]);

  useEffect(() => {
    if (selectedDateTime) {
      const currentDate = new Date();
      const futureTime = new Date(currentDate.getTime() + 12 * 60 * 60 * 1000); // 현재 시간 + 12시간
      dispatch(setDateValid(selectedDateTime > futureTime));
    }
  }, [selectedDateTime]);
  
  useEffect(() => {
    if (selectedDateTime && lessonTakenTime) {
      dispatch(setTimeTakenVaild(true));
    } else {
      dispatch(setTimeTakenVaild(false));
    }
  }, [selectedDateTime, lessonTakenTime]);
  
  return (
    <div >
      <div className="lessonInfoTopContainer">
        <div className="lessonInfoTopTitleContainer">
          <div className="lessonInfoText">과외 일시 <span className="required">*</span></div>
          {/* <div>{dateValid ? '✅' : '🔲'}</div> */}
          <DatePicker
            className='lessonInfoDatePicker'
            selected={selectedDateTime}
            onChange={handleDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy. MM. dd. HH:mm"
            placeholderText='과외 일시'
          />
          {selectedDateTime && !dateValid && <p style={{ color: 'red' }}>
            현재 시간 기준 12시간 이내의 과외는 생성할 수 없습니다!
            <br/>
            올바른 날짜를 선택해주세요.
          </p>}
        </div>
        <div className="lessonInfoTopTitleContainer">
          <div className="lessonInfoText">예상 소요 시간 <span className="required">*</span></div>
          {/* <div>{timeTakenValid ? '✅' : '🔲'}</div> */}
          <select className='lessonInfoSelect' value={lessonTakenTime} onChange={handleTakenTime}>
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
    </div>
  );
}

export default LessonTime;
