import React from 'react';
import { setLessonId } from '../../store/lesson/lessonInfo';
import { useDispatch } from 'react-redux';
import '../../style/lesson/lessonItemCss.css';

function LessonItem({ id, title, date, thumbnailUrl, reviewAvg, cookyerName, categoryId }) {

  const dispatch = useDispatch();
  const handleItemClick = () => {
    dispatch(setLessonId(id));
  }

  const formattedDate = new Date(date);
  const options = { month: '2-digit', day: '2-digit', weekday: 'short' };
  const formattedDateString = formattedDate.toLocaleDateString('ko-KR', options);
  const convertCategoryId = ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'];
  const category = convertCategoryId[categoryId - 1];

  const currentTime = new Date();
  const futureTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000); // 현재 시간 + 12시간

  let message = '';
  if (formattedDate < futureTime) {
    message = '앞으로 12시간 이전에 열릴 과외이므로, 신청 불가능합니다.'
  }

  return (
    <div 
      onClick={handleItemClick}
      className='lessonItem'
    >
      <img className='thumbnail' src={thumbnailUrl} alt='image' />
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
      <div style={{ color: 'red' }}>
        {message}
      </div>
    </div>
  );
}

export default LessonItem;
