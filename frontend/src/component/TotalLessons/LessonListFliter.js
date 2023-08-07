import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeadLine, setOrder } from '../../store/lesson/lessonSearch';
import '../../style/lesson/lessonListFilterCss.css';

function LessonListFliter() {
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState('title');
  const [deadlineCheck, setDeadlineCheck] = useState(true)

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
    dispatch(setOrder(event.target.value))
  };
  const handleDeadLine = () => {
    const updatedDeadlineCheck = !deadlineCheck;
    setDeadlineCheck(updatedDeadlineCheck);
    dispatch(setDeadLine(updatedDeadlineCheck));
  }
  return (
    <div>
      <div>
        <select 
          className='sortSelect'
          value={sortBy} 
          onChange={handleSortChange}>
          <option value="title">가나다순</option>
          <option value="date">마감임박순</option>
          <option value="price">가격순</option>
          <option value="avg">평점순</option>
          <option value="review">리뷰순</option>
        </select>
      </div>
      <div className='deadlineContainer'>
        <input 
          type="checkbox" 
          checked={deadlineCheck} 
          onChange={handleDeadLine}
          className='deadlineCheckbox'
          id='deadlineCheckbox'
        />
        <label htmlFor='deadlineCheckbox' className='deadlineLabel'>
          마감 과외 보여주기
        </label>
      </div>
    </div>
  );
}

export default LessonListFliter;
