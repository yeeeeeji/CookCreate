import React, { useEffect, useState } from 'react';
import LessonStep from '../component/RegisterLesson/LessonStep';
import LessonInfoTop from '../component/RegisterLesson/LessonInfoTop';
import LessonTime from '../component/RegisterLesson/LessonTime';
import LessonDetail from '../component/RegisterLesson/LessonDetail';
import RegisterForm from '../component/RegisterLesson/RegisterForm';
import { useDispatch } from 'react-redux';
import PreviousLesson  from '../component/RegisterLesson/PreviousLesson'
import { resetlessonReducer } from '../store/lesson/lesson';
import SimpleModal from '../component/AlertModal/SimpleModal';

function RegisterLesson() {
  const dispatch = useDispatch();
  const [ content, setContent ] = useState('')
  const [ showAlert, setShowAlert ] = useState(false)
  const [ path, setPath ] = useState(null)

  useEffect(() => {
    dispatch(resetlessonReducer())
  }, []) // 페이지 렌더링시 lessonReducer 초기화
  return (
    <div>
      <div className='registerLessonTitleContainer'>
        <div className='registerLessonTitle'>
          과외 개설하기
        </div>
        <PreviousLesson/>
      </div>
      <LessonInfoTop/>
      <LessonTime/>
      <LessonDetail/>
      <LessonStep/>
      <br />
      <RegisterForm setContent={setContent} setShowAlert={setShowAlert} setPath={setPath}/>
      {showAlert ? (
        <SimpleModal content={content} path={path}/>
      ) :  null}
    </div>
  );
}

export default RegisterLesson;