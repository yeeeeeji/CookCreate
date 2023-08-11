import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { setTimeTaken, setTimeTakenVaild } from "../../store/lesson/lessonEdit";
function EditLessonTime() {
  const dispatch = useDispatch()
  const lessonDate = useSelector((state) => (state.lessonInfo.lessonDate))
  const initTimeTaken = useSelector((state) => state.lessonInfo.timeTaken)
  const [lessonTakenTime, setLessonTakenTime] = useState(initTimeTaken)

  //유효성 검사
  const dateValid = useSelector((state) => state.lessonEdit.dateValid)
  const timeTakenValid = useSelector((state) => state.lessonEdit.timeTakenValid)

  const handleTakenTime = (e) => {
    setLessonTakenTime(e.target.value)
    dispatch(setTimeTakenVaild(e.target.value !== ''))
    dispatch(setTimeTaken(e.target.value))
  };  

  return (
    <div style={{display : 'flex', alignItems : 'center'}}>
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>강의 일시</h3>
          <h5>강의 일시는 수정할 수 없습니다.</h5>
          <div style={{marginLeft : '5px'}}>{dateValid ? '✅' : '🔲'}</div>
        </div>
        {lessonDate}

      </div>
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>강의 시간</h3>
          <div style={{marginLeft : '5px'}}>{timeTakenValid ? '✅' : '🔲'}</div>
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
