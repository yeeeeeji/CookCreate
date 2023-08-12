import React, { useEffect, useState } from "react";
import FoodCategory from "./FoodCategory";
import { useDispatch, useSelector } from "react-redux";
import { setLessonTitle, setTitleValid } from "../../store/lesson/lesson";

function LessonInfoTop() {
  const dispatch = useDispatch();
  const [lessonTitle, sLessonTitle] = useState("");
  const titleValid = useSelector((state) => state.lesson.titleValid)
  const reduxLessonTitle = useSelector((state) => state.lesson.lessonTitle)
  const titleChange = (e) => {
    const titleValue = e.target.value;
    dispatch(setLessonTitle(titleValue));
    sLessonTitle(titleValue);
  };

  useEffect(() => {
    sLessonTitle(reduxLessonTitle)
    dispatch(setTitleValid(lessonTitle.trim() !== ""));
  }, [reduxLessonTitle, lessonTitle])


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

export default LessonInfoTop;