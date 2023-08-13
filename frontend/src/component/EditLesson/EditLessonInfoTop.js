import React, {useEffect, useState} from 'react';
import FoodCategory from "./FoodCategory";
import { useDispatch, useSelector } from "react-redux";
import { setLessonTitle, setTitleValid } from "../../store/lesson/lessonEdit";

function EditLessonDetail() {
  const dispatch = useDispatch();
  const initLessonTitle = useSelector((state) => state.lessonEdit.lessonTitle)
  const titleValid = useSelector((state) => state.lessonEdit.titleValid)
  
  const [lessonTitle, setLessonTitleState] = useState('');
  
  useEffect(() => {
    setLessonTitleState(initLessonTitle);
  }, [initLessonTitle]);


  const titleChange = (e) => {
    const titleValue = e.target.value;
    setLessonTitleState(titleValue);
    dispatch(setLessonTitle(titleValue));
    dispatch(setTitleValid(titleValue.trim() !== ""));
  };
  return (
    <div style={{display : 'flex', alignItems : 'center'}}>
      <FoodCategory />
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>과외 제목</h3>
          <div style={{marginLeft : '5px'}}>{titleValid ? '✅' : '🔲'}</div>
        </div>
        <input
          type="text"
          value={lessonTitle}
          onChange={titleChange}
          placeholder="과외 제목을 입력해주세요!"
          />
      </div>
    </div>
  );
}

export default EditLessonDetail;