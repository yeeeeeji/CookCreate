import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, setDeadLine } from '../../store/lessonInfo/lessonInfo';

function LessonListFliter() {
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState('title');
  const [deadline, setDeadline] = useState(false)




  const handleSortChange = (event) => {
    setSortBy(event.target.value)
    dispatch(setSort(event.target.value))
  };
  const handleDeadLine = () => {
    setDeadline(!deadline)
    dispatch(setDeadLine(!deadline))
  }
  return (
    <div>
      <div>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="title">가나다순</option>
          <option value="date">마감임박순</option>
          <option value="price">가격순</option>
          <option value="avg">평점순</option>
          <option value="review">리뷰순</option>
        </select>
      </div>
      <div>
        <input type="checkbox" value={deadline} onClick={handleDeadLine}/>
        마감 과외 보여주기
      </div>
    </div>
  );
}

export default LessonListFliter;
