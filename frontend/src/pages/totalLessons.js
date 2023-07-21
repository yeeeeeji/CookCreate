import React from 'react';
import FoodCategory from '../component/TotalLessons/FoodCategory';
import TotalLessons from '../component/TotalLessons/TotalLessons';
import EndLessons from '../component/TotalLessons/EndLessons';
import LessonList from '../component/TotalLessons/LessonList';
function totalLessons() {
  return (
    <div>
      <div>
        수업 전체 보기
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FoodCategory/> |
          <TotalLessons/>
          <EndLessons/>
        </div>
      </div>
      <div>
        <LessonList/>
      </div>
    </div>
  );
}

export default totalLessons;