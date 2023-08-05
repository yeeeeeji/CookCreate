import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LessonItem from './LessonItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategories } from '../../store/lesson/lessonSearch';
function LessonList() {
  const [lessons, setLessons] = useState([]);
  const type = useSelector((state) => state.lessonSearch.type);
  const deadline = useSelector((state) => state.lessonSearch.deadline);
  const order = useSelector((state) => state.lessonSearch.order);
  const category = useSelector((state) => state.lessonSearch.category);
  const keyword = useSelector((state) => state.lessonSearch.keyword);
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`/api/v1/lesson`, {
      params: {
        type,
        keyword,
        category,
        order,
        deadline,
      }
    })
    .then((res) => {
      setLessons(res.data)
    })
    .catch((err) => {
      console.error(err)
    });
  }, [type, keyword, category, order, deadline])
  const handleLinkClick = () => {
    dispatch(setCategories([])); // 빈 문자열로 카테고리 초기화
  }
  return (
    <div>
      {lessons.map((lesson) => (
        <div 
        key={lesson.lessonId}
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px'
          }}>
          <Link
            to={`/lesson/${lesson.lessonId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={handleLinkClick}
          >
            <LessonItem
              id={lesson.lessonId}
              title={lesson.lessonTitle}
              date={lesson.lessonDate}
              thumbnailUrl = {lesson.thumbnailUrl}
              reviewAvg = {lesson.reviewAvg}
              cookyerName = {lesson.cookyerName}
              categoryId = {lesson.categoryId} 
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LessonList;
