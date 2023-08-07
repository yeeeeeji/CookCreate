import React from 'react';
import { useSelector } from 'react-redux';

function IntroduceLesson() {
  const difficulty = useSelector((state) => state.lessonInfo.difficulty)
  const description = useSelector((state) => state.lessonInfo.description)
  const materials = useSelector((state) => state.lessonInfo.materials)
  return (
    <div>
      <h2>강의 소개</h2>
      <div>
        <h3>난이도</h3>
        {difficulty}
      </div>
      <div>
        <h3>강의 설명</h3>
        {description}
      </div>
      <div>
        <h3>준비물</h3>
        {materials}
      </div>
    </div>
  );
}

export default IntroduceLesson;