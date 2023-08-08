import React, { useEffect } from 'react';
import LessonStep from '../component/RegisterLesson/LessonStep';
import LessonInfoTop from '../component/RegisterLesson/LessonInfoTop';
import LessonTime from '../component/RegisterLesson/LessonTime';
import LessonDetail from '../component/RegisterLesson/LessonDetail';
import RegisterForm from '../component/RegisterLesson/RegisterForm';
import { useDispatch } from 'react-redux';
import { resetlessonReducer } from '../store/lesson/lesson';
function RegisterLesson() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetlessonReducer())
  })
  return (
    <div>
      <h2>
        강의 개설하기
      </h2>
      <LessonInfoTop/>
      <LessonTime/>
      <LessonDetail/>
      <LessonStep/>
      <br />
      <RegisterForm/>
    </div>
  );
}

export default RegisterLesson;