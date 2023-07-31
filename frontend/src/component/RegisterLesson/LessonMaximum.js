import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMaximum, setMaximumValid } from '../../store/lesson/lesson';

function LessonMaximum() {
  const dispatch = useDispatch();
  const [maximum, setLessonMaximum] = useState(''); // 기본 값은 빈 문자열로 설정
  const maximumValid = useSelector((state) => state.lesson.maximumValid)
  const changeMaximum = (e) => {
    const newMaximum = e.target.value;
    setLessonMaximum(newMaximum);

    if (newMaximum === '') {
      dispatch(setMaximumValid(false));
    } else {
      dispatch(setMaximum(newMaximum));
      dispatch(setMaximumValid(true));
    }
  };

  useEffect(() => {
    if (maximum !== '') {
      dispatch(setMaximumValid(true));
    }
  }, [maximum, dispatch]);

  return (
    <div>
      <div style={{display:'flex', alignItems : 'center'}}>
        <h3>최대 수강생 수</h3>
        <div style={{marginLeft : '5px'}}> {maximumValid ? '✅' : '🔲'} </div>
      </div>

        <select value={maximum} onChange={changeMaximum}>
          <option value="">최대 수강생 선택</option>
          {/* <option value="1">1명</option> */}
          {/* <option value="2">2명</option> */}
          {/* <option value="3">3명</option> */}
          <option value="4">4명</option>
          <option value="5">5명</option>
          <option value="6">6명</option>
        </select>
    </div>
  );
}

export default LessonMaximum;
