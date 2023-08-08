import React from 'react';
import {setLessonId} from '../../store/lesson/lessonInfo'
import { useDispatch } from 'react-redux';
import '../../style/lesson/lessonItemCss.css';

function LessonItem({id, title, date, thumbnailUrl, reviewAvg, cookyerName, categoryId}) {
  
  const dispatch = useDispatch()
  const handleItemClick = () => {
    dispatch(setLessonId(id))
  }
  // 날짜를 08-03(목)과 같은 형태로 변환
  const formattedDate = new Date(date);  
  const options = { month: '2-digit', day: '2-digit', weekday: 'short' };
  const formattedDateString = formattedDate.toLocaleDateString('ko-KR', options);
  
  const convertCategoryId = ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트']
  const category = convertCategoryId[categoryId - 1]
  return (
    <div 
      onClick={handleItemClick}
      className='lessonItem'
    >
      <img className='thumbnail' src={thumbnailUrl} alt='image'/>
      <h3>{title}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          ⭐{reviewAvg}
        </div>
        <div className='datename'>
          {formattedDateString} | {cookyerName}
        </div>
      </div>
      <button className='categoryBadge'>
        {category}
      </button>
    </div>
  );
}

export default LessonItem;
