import React from 'react';
import { Link } from 'react-router-dom';
import LessonItem from './LessonItem';

function LessonList() {
  const lessons = [
    { id: 1, title: '수업 1', content: '...' },
    { id: 2, title: '수업 2', content: '...' },
    { id: 3, title: '수업 3', content: '...' },
  ];
  return (
    <div>
      for문 돌며 뽑아내기
      <LessonItem/>
      {lessons.map((lesson) => (
        // 각 레슨의 ID를 이용하여 Link를 생성합니다.
        <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
        </Link>
      ))}
    </div>
  );
}

export default LessonList;