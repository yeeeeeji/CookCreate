import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPrice, setMaximum, setDifficulty, setDescription, 
  setVideoUrl, setMaterials, setThumbnail } from '../../store/lesson/lesson';

function LessonDetail() {
  const dispatch = useDispatch();
  const [lessonPrice, setLessonPrice] = useState('');
  const [maximum, setLessonMaximum] = useState('');
  const [lessonDifficulty, setLessonDifficulty] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [lessonDescription, setLessonDescription] = useState('')
  const [lessonVideoUrl, setLessonVideoUrl] = useState('')
  const [lessonMaterialList, setLessonMaterialList] = useState([])
  const [lessonMaterial, setLessonMaterial] = useState('')
  const [lessonThumbnailUrl, setLessonThumbnailUrl] = useState('')

  const changePrice = (e) => {
    setLessonPrice(e.target.value);
  };

  const changeMaximum = (e) => {
    setLessonMaximum(e.target.value);
  };

  const handleDifficultyClick = (difficulty) => {
    setLessonDifficulty(difficulty);
    setSelectedDifficulty(difficulty)
  };
  const handleLessonDescription = (e) =>{
    setLessonDescription(e.target.value)
  }

  const handleVideoUrl = (e) => {
    setLessonVideoUrl(e.target.value)
  }
  const handleChange = (e) => {
    setLessonMaterial(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newList = lessonMaterial.split('\n').map((str) => str.trim()).filter((str) => str !== '');
    setLessonMaterialList(newList)
  }
  const handleThumbnailUrl = (e) => {
    setLessonThumbnailUrl(e.target.value)
  }
  useEffect(() => {
    dispatch(setPrice(lessonPrice));
    dispatch(setMaximum(maximum));
    dispatch(setDifficulty(lessonDifficulty))
    dispatch(setDescription(lessonDescription))
    dispatch(setVideoUrl(lessonVideoUrl))
    dispatch(setMaterials(lessonMaterialList))
    dispatch(setThumbnail(lessonThumbnailUrl))
  }, [dispatch, lessonPrice, maximum, lessonDifficulty, lessonDescription,
      lessonVideoUrl, lessonMaterialList, lessonThumbnailUrl]);

  return (
    <div>
      {/* 수강료 */}
      <div> 
        <input
          type="text"
          min="0"
          placeholder="수강료"
          value={lessonPrice}
          onChange={changePrice}
        />
      </div>
      {/* 최대 수강 인원 */}
      <div>
        <input
          type="number"
          min="1"
          max="6"
          placeholder="최대 수강생"
          value={maximum}
          onChange={changeMaximum}
        />
      </div>
      {/* 난이도 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onClick={() => handleDifficultyClick('EASY')}
          style={{ backgroundColor: selectedDifficulty === 'EASY' ? 'lightgray' : 'white' }}
        >
          EASY
        </div>
        <div
          onClick={() => handleDifficultyClick('MEDIUM')}
          style={{ backgroundColor: selectedDifficulty === 'MEDIUM' ? 'lightgray' : 'white' }}
        >
          MEDIUM
        </div>
        <div
          onClick={() => handleDifficultyClick('HARD')}
          style={{ backgroundColor: selectedDifficulty === 'HARD' ? 'lightgray' : 'white' }}
        >
          HARD
        </div>
      </div>
      {/* 과외 설명 */}
      <div>
        <input type="text"
          value={lessonDescription}
          onChange={handleLessonDescription}
          placeholder='과외 설명'
        />
      </div>
      {/* 유튜브 링크 */}
      <div>
        <input type="text"
          value={lessonVideoUrl}
          onChange={handleVideoUrl}
          placeholder='맛보기 영상의 주소를 올려주세요!'
        />
      </div>
      {/* 썸네일 */}
      <div>
        <input type="text"
          value={lessonThumbnailUrl}
          onChange={handleThumbnailUrl}
          placeholder='과외 썸네일의 url을 올려주세요!'
        />
      </div>
      <h3>준비물 입력 창</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={lessonMaterial}
          onChange={handleChange}
          placeholder="재료를 입력하세요. 각 재료들을 새 줄로 입력해주시면 됩니다."
          rows={5}
          cols={40}
        />
        <button type="submit">입력 완료</button>
      </form>
      <div>
        <h3>준비물 리스트</h3>
        <div>
          {lessonMaterialList.map((str, index) => (
            <div key={index}>{str}</div>
          ))}
        </div>
      </div>



    </div>
  );
}

export default LessonDetail;
