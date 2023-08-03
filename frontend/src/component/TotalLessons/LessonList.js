import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LessonItem from './LessonItem';
import { useSelector } from 'react-redux';
import axios from 'axios';

function LessonList() {
  const [lessons, setLessons] = useState([]);
  const type = useSelector((state) => state.lessonInfo.type);
  const deadline = useSelector((state) => state.lessonInfo.deadline);
  const order = useSelector((state) => state.lessonInfo.order);
  const category = useSelector((state) => state.lessonInfo.category);
  const keyword = useSelector((state) => state.lessonInfo.keyword);

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
      console.log(res.data);
      setLessons(res.data); // 받아온 데이터를 state에 저장
    })
    .catch((err) => {
      console.error(err);
    });
  }, [type, keyword, category, order, deadline]);

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
