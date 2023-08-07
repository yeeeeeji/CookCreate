import React, {useState} from 'react';
import FoodCategory from "./FoodCategory";
import { useDispatch, useSelector } from "react-redux";
import { setLessonTitle, setTitleValid } from "../../store/lesson/lessonEdit";

function EditLessonDetail() {
  const dispatch = useDispatch();
  const initLessonTitle = useSelector((state) => state.lessonInfo.lessonTitle)
  const titleValid = useSelector((state) => state.lessonEdit.titleValid)
  
  const [lessonTitle, sLessonTitle] = useState(initLessonTitle);
  
  const titleChange = (e) => {
    const titleValue = e.target.value;
    sLessonTitle(titleValue);
    dispatch(setLessonTitle(titleValue));
    dispatch(setTitleValid(titleValue.trim() !== ""));
  };
  return (
    <div style={{display : 'flex', alignItems : 'center'}}>
      <FoodCategory />
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>강의 제목</h3>
          <div style={{marginLeft : '5px'}}>{titleValid ? '✅' : '🔲'}</div>
        </div>
        <input
          type="text"
          value={lessonTitle}
          onChange={titleChange}
          placeholder="강의 제목을 입력해주세요!"
          />
      </div>
    </div>
  );
}

export default EditLessonDetail;