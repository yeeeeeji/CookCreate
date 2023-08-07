import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditForm() {
  const navigate = useNavigate();
  const lessonId = useSelector((state) => state.lessonInfo.lessonId);
  const [filename, setFileName] = useState('');
  const initThumbnail = useSelector((state) => state.lessonInfo.thumbnailUrl);
  const [thumbnailUrl, setThumbnailUrl] = useState(initThumbnail)


  const [ThumbnailFile, setThumbnailFile] = useState(null); // 수정한 파일 정보 넣어줄 것
  const accessToken = localStorage.getItem('access_token');
  const lessonTitle = useSelector((state) => state.lessonEdit.lessonTitle);
  const categoryId = useSelector((state) => parseInt(state.lessonEdit.categoryId)) + 1;
  const maximum = useSelector((state) => parseInt(state.lessonEdit.maximum));
  const price = useSelector((state) => parseInt(state.lessonEdit.price));
  const lessonDate = useSelector((state) => state.lessonEdit.lessonDate).slice(0, -5);
  const difficulty = useSelector((state) => state.lessonEdit.difficulty);
  const timeTaken = useSelector((state) => parseInt(state.lessonEdit.timeTaken));
  const description = useSelector((state) => state.lessonEdit.description);
  const materials = useSelector((state) => state.lessonEdit.materials);
  const videoUrl = useSelector((state) => state.lessonEdit.videoUrl);
  const lessonStepList = useSelector((state) => state.lessonEdit.lessonStepList);

  const categoryValid = useSelector((state) => state.lessonEdit.categoryValid);
  const titleValid = useSelector((state) => state.lessonEdit.titleValid);
  const maxValid = useSelector((state) => state.lessonEdit.maxValid);
  const priceValid = useSelector((state) => state.lessonEdit.priceValid);
  const dateValid = useSelector((state) => state.lessonEdit.dateValid);
  const difficultyValid = useSelector((state) => state.lessonEdit.difficultyValid);
  const timeTakenValid = useSelector((state) => state.lessonEdit.timeTakenValid);
  const materialsValid = useSelector((state) => state.lessonEdit.materialsValid);
  const stepValid = useSelector((state) => state.lessonEdit.stepValid);
  const descriptionValid = useSelector((state) => state.lessonEdit.descriptionValid);
  const [thumbnailValid, setThumbnailValid] = useState(true);
  
  
  const isAllValid = [
    categoryValid,
    titleValid,
    maxValid,
    priceValid,
    dateValid,
    difficultyValid,
    timeTakenValid,
    materialsValid,
    stepValid,
    descriptionValid,
    thumbnailValid,
  ].every((isValid) => isValid);

  const handleThumbnailUrl = (e) => {
    setFileName(e.target.value); // 파일명 유저들에게 보여주기
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailUrl(URL.createObjectURL(file))
    setThumbnailValid(!!file);
  };

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (ThumbnailFile !== null) {
      formData.append('thumbnailUrl', ThumbnailFile);
    }
    formData.append('lessonId', lessonId);
    formData.append('lessonTitle', lessonTitle);
    formData.append('categoryId', categoryId);
    formData.append('maximum', maximum);
    formData.append('price', price);
    formData.append('lessonDate', lessonDate);
    formData.append('difficulty', difficulty);
    formData.append('timeTaken', timeTaken);
    formData.append('description', description);
    formData.append('videoUrl', videoUrl);
    materials.forEach((material) => {
      formData.append('materials', material);
    });

    lessonStepList.forEach((step, index) => {
      formData.append(`lessonStepList[${index}].stepOrder`, step.stepOrder);
      formData.append(`lessonStepList[${index}].stepContent`, step.stepContent);
    });

    axios
      .put(`/api/v1/lesson`, formData, {
        headers: {
          Access_Token: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        alert('과외 수정에 성공했습니다!');
        navigate('/lesson');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* 썸네일 */}
      <div>
        {thumbnailUrl}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>과외 썸네일</h3>
          <div>{thumbnailValid ? '✅' : '🔲'}</div>
        </div>
        <div>
          <input
            type="file"
            name="filename"
            accept="image/*"
            value={filename}
            onChange={handleThumbnailUrl}
          />
          <img
            src={thumbnailUrl}
            alt="Selected Thumbnail"
            style={{ maxWidth: '100px', marginTop: '10px' }}
          />
        </div>
      </div>
      <button disabled={!isAllValid} onClick={register}>
        과외 수정하기
      </button>
    </div>
  );
}

export default EditForm;
