import React from 'react';
import LessonStep from '../component/RegisterLesson/LessonStep';
import LessonInfo from '../component/RegisterLesson/LessonInfo';
function registerLesson() {

  return (
    <div>
      강의 개설하기
      <LessonInfo/>
      <LessonStep/>
    </div>
  );
}

export default registerLesson;