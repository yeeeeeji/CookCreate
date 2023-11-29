import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeadLine, setOrder } from '../../store/lesson/lessonSearch';
import '../../style/lesson/lessonListFilterCss.css';
import { FiChevronDown } from 'react-icons/fi';

function LessonListFliter() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('title');
  const initDeadline = useSelector((state) => state.lessonSearch.deadline)
  const [deadlineCheck, setDeadlineCheck] = useState(initDeadline);
  useEffect(() => {
    setDeadlineCheck(initDeadline);
  }, [initDeadline]);
  const storeDeadline = useSelector((state) => state.lessonSearch.deadline)
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    dispatch(setOrder(event.target.value));
  };
  const handleDeadLine = () => {
    setDeadlineCheck(!deadlineCheck);
    
    dispatch(setDeadLine(!storeDeadline));
  };

  return (
    <div>
      <div className='lessonSortSelectContainer'>
        <select
          className='lessonSortSelect'
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="title">가나다순</option>
          <option value="date">마감임박순</option>
          <option value="price">가격순</option>
          <option value="avg">평점순</option>
          <option value="review">리뷰순</option>
        </select>
        <FiChevronDown className="sort-icon"/>
      </div>
      <div className='lessonDeadlineContainer'>
        <input
          type="checkbox"
          checked={!deadlineCheck}
          onChange={handleDeadLine}
          className='lessonDeadlineCheckbox'
          id='deadlineCheckbox'
        />
        
        <label htmlFor='lessonDeadlineCheckbox' className='lessonDeadlineLabel'>
          마감 과외 보여주기
        </label>
      </div>
    </div>
  );
}

export default LessonListFliter;
