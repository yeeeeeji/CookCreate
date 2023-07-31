import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeTaken, setTimeTakenValid } from '../../store/lesson/lesson';

function TimeTakenDropdown() {
  const dispatch = useDispatch()
  const TimeTakenValid = useSelector((state) => state.lesson.timeTakenValid)
  const timeTaken = useSelector((state) => state.lesson.timeTaken);
  const handleTimeTakenChange = (e) => {
    dispatch(setTimeTaken(e.target.value));
    const isTimeTakenValid = e.target.value !== ''
    dispatch(setTimeTakenValid(isTimeTakenValid))
  }

  return (
    <div>
      <div style={{display :'flex', alignItems : 'center'}}>
        <h3>과외 시간</h3>
        <div style={{marginLeft : '5px'}}> {TimeTakenValid ? '✅' : '🔲'} </div>
      </div>
      <div>
        <select value={timeTaken} onChange={handleTimeTakenChange}>
          <option value="">강의 소요시간</option>
          {[60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 
          160, 170, 180, 190, 200, 210, 220, 230, 240].map((option) => (
            <option key={option} value={option}>
              {option}분
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeTakenDropdown;
