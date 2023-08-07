import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditLessonInfoTop from '../component/EditLesson/EditLessonInfoTop';
import EditLessonTime from '../component/EditLesson/EditLessonTime';
import EditLessonDetail from '../component/EditLesson/EditLessonDetail';
import EditLessonStep from '../component/EditLesson/EditLessonStep';
import EditForm from '../component/EditLesson/EditForm';
import { useDispatch } from 'react-redux';
import { setCategory, setLessonTitle } from '../store/lesson/lessonEdit';

function EditLesson() {
  const { lessonId } = useParams();
  const dispatch = useDispatch()
  const access_token = localStorage.getItem('access_token')
  
  useEffect(() => {
    axios.get(`/api/v1/lesson/${lessonId}`, {
      headers : {
        Access_Token : access_token
      }
    })
      .then((res) => {
        console.log(res.data);
        dispatch(setLessonTitle(res.data.lessonTitle))
        dispatch(setCategory(res.data.categoryId))
      })
      .catch((err) => {
        console.error(err);
      });
  }, [lessonId]);

  return (
    <div>
      <h2>강의 수정하기</h2>
      <EditLessonInfoTop 
      />
      <EditLessonTime />
      <EditLessonDetail />
      <EditLessonStep />
      <br />
      <EditForm />
    </div>
  );
}

export default EditLesson;
