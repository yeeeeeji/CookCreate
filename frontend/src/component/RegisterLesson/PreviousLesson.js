import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLessonTitle, setTitleValid,
  setCategory, setCategoryValid,
  setTimeTaken, setTimeTakenVaild,
  setDateTime, setDateValid,
  setPrice, setPriceValid,
  setMaximum, setMaximumValid,
  setDifficulty, setDifficultyValid,
  setDescription, setDescriptionValid,
  setMaterials, setMaterialsValid,
  setLessonStepList, setStepValid,
  setVideoUrl, setThumbnailVaild
  } from '../../store/lesson/lesson'
function PreviousLesson() {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem('access_token');
  const [showModal, setShowModal] = useState(false);

  const handlePreviousLesson = () => {
    setShowModal(true);
  };

  const confirmRegistration = () => {
    axios
      .get(`api/v1/lesson/latest`, {
        headers: {
          Access_Token: access_token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setLessonTitle(res.data.lessonTitle))
        dispatch(setCategory(res.data.categoryId))
        dispatch(setTimeTaken(res.data.timeTaken))
        dispatch(setPrice(res.data.price))
        dispatch(setMaximum(res.data.maximum))
        dispatch(setDifficulty(res.data.difficulty))
        dispatch(setDescription(res.data.description))
        dispatch(setMaterials(res.data.materials))
        dispatch(setLessonStepList(res.data.lessonStepList))
        dispatch(setVideoUrl(res.data.videoUrl))
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div onClick={handlePreviousLesson}>직전에 예약한 강의 불러오기</div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div>정말 등록하시겠습니까?</div>
            <button onClick={confirmRegistration}>예</button>
            <button onClick={closeModal}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviousLesson;
