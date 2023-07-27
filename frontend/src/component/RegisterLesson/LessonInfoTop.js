// LessonInfo.js
import React, { useState } from "react";
import FoodCategory from "./FoodCategory";
import { useDispatch } from "react-redux";
import { setLessonTitle } from "../../store/lesson/lesson";
function LessonInfoTop() {
  const dispatch = useDispatch();
  const [lessonTitle, setlessonTitle] = useState("");

  const titleChange = (e) => {
    setlessonTitle(e.target.value);
    dispatch(setLessonTitle(e.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FoodCategory />
      <input
        type="text"
        value={lessonTitle}
        onChange={titleChange}
        placeholder="강의 제목을 입력해주세요!"
      />
    </div>
  );
}

export default LessonInfoTop;
