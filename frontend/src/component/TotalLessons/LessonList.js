import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LessonItem from './LessonItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategories, setDeadLine, setKeyword, setOrder, setType } from '../../store/lesson/lessonSearch';
import '../../style/lesson/lessonListCss.css';

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
    dispatch(setCategories([]))
    dispatch(setType('all'))
    dispatch(setKeyword(''))
    dispatch(setOrder('title'))
    dispatch(setDeadLine(true))
  }
  return (
    <div className='lessonListContainer'>
      {lessons.map((lesson) => (
        <div 
          key={lesson.lessonId}
          className="lessonItemContainer"
        >
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
