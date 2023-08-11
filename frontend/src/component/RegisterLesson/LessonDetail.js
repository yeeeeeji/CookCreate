import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrice, setPriceValid, setMaximum, setMaximumValid, setDifficulty, setDescription, 
  setVideoUrl, setMaterials, setDifficultyValid, setDescriptionValid, setMaterialsValid } from '../../store/lesson/lesson';

function LessonDetail() {
  const dispatch = useDispatch();
  const [maximum, setLessonMaximum] = useState('');
  const [lessonDifficulty, setLessonDifficulty] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [lessonPrice, setLessonPrice] = useState('');
  const [lessonDescription, setLessonDescription] = useState('')
  const [lessonVideoUrl, setLessonVideoUrl] = useState('')
  const [lessonMaterialList, setLessonMaterialList] = useState([])
  const [lessonMaterial, setLessonMaterial] = useState('')
  //불러오기
  const reduxPrice = useSelector((state) => state.lesson.price)
  const reduxMaximum = useSelector((state) => state.lesson.maximum)
  const reduxDescribe = useSelector((state) => state.lesson.description)
  const reduxVideoUrl = useSelector((state) => state.lesson.videoUrl)
  const reduxDifficulty = useSelector((state) => state.lesson.difficulty)
  const reduxMaterialList = useSelector((state) => state.lesson.materials)
  //유효성
  const priceValid = useSelector((state) => state.lesson.priceValid)
  const maxValid = useSelector((state) => state.lesson.maxValid)
  const difficultyValid = useSelector((state) => state.lesson.difficultyValid)
  const descriptionValid = useSelector((state) => state.lesson.descriptionValid)
  const materialValid = useSelector((state) => state.lesson.materialsValid)
  const [errorMsg, setErrorMsg] = useState('');

  const handleChangePrice = (e) => {
    const input = e.target.value
    if (isNaN(input)) {
      setErrorMsg('숫자만 입력해주세요!')
    } else {
      setErrorMsg('')
      setLessonPrice(input)
      dispatch(setPrice(input))
    }
  };
  const changeMaximum = (e) => {
    const input = e.target.value
    setLessonMaximum(input)
    dispatch(setMaximum(input))
  };
  const handleDifficultyClick = (difficulty) => {
    setLessonDifficulty(difficulty)
    dispatch(setDifficulty(difficulty))
  };
  const handleLessonDescription = (e) =>{
    const input = e.target.value
    setLessonDescription(input)
    dispatch(setDescription(input))
  }
  const handleVideoUrl = (e) => {
    const url = e.target.value
    dispatch(setVideoUrl(url))
    setLessonVideoUrl(url)
  }
  const handleChange = (e) => {
    setLessonMaterial(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newList = lessonMaterial.split('\n').map((str) => str.trim()).filter((str) => str !== '');
    setLessonMaterialList(newList)
    dispatch(setMaterials(newList))    
  }
  useEffect(() => {
    setLessonPrice(reduxPrice)
    dispatch(setPriceValid(!!lessonPrice.toString().length))
  }, [reduxPrice, lessonPrice])

  useEffect(() => { 
    setLessonDescription(reduxDescribe)
    dispatch(setDescriptionValid((lessonDescription.trim() !== '')))
  }, [lessonDescription, reduxDescribe])

  useEffect(() => {
    setLessonVideoUrl(reduxVideoUrl)
  }, [reduxVideoUrl, lessonVideoUrl])

  useEffect(() => {
    setLessonMaximum(reduxMaximum)
    dispatch(setMaximumValid(maximum !== 0))
  }, [reduxMaximum, maximum])

  useEffect(() => {
    setSelectedDifficulty(reduxDifficulty);
    dispatch(setDifficultyValid(!!reduxDifficulty));
  }, [reduxDifficulty]);

  useEffect(() => {
    setLessonMaterialList(reduxMaterialList)
    dispatch(setMaterialsValid(lessonMaterial.trim() !== '' || lessonMaterialList.length > 0));
  }, [reduxMaterialList, lessonMaterialList])

  return (
    <div>
      {/* 수강료 */}
      <div style={{display : 'flex', alignItems : 'center'}}>
        <div>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <h3>수강료</h3>
            <div style={{marginLeft : '5px'}}>{priceValid ? '✅' : '🔲'}</div>
          </div>
          <div> 
            <input
              type="text"
              min="0"
              placeholder="수강료"
              value={lessonPrice}
              onChange={handleChangePrice}
              />
          </div>
          {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
        </div>
        {/* 최대 수강 인원 */}
        <div>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <h3>최대 수강 인원</h3>
            <div style={{marginLeft : '5px'}}>{maxValid ? '✅' : '🔲'}</div>
          </div>
          <select value={maximum} onChange={changeMaximum}>
            <option value="">-</option>
            {Array.from({ length: 6 }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>
                {value}명
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* 난이도 */}
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>강의 난이도</h3>
          <div style={{marginLeft : '5px'}}>{difficultyValid ? '✅' : '🔲'}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() =>  handleDifficultyClick('EASY')}
            style={{ 
              backgroundColor: selectedDifficulty === 'EASY' ? 'lightgray' : 'white',
              padding : '5px',
              marginRight : '5px',
              cursor : 'pointer'
             }}
          >
            EASY
          </div>
          <div
            onClick={() => handleDifficultyClick('NORMAL')}
            style={{ 
              backgroundColor: selectedDifficulty === 'NORMAL' ? 'lightgray' : 'white',
              padding : '5px',
              marginRight : '5px',
              cursor : 'pointer' 
            }}
          >
            NORMAL
          </div>
          <div
            onClick={() => handleDifficultyClick('HARD')}
            style={{ 
              backgroundColor: selectedDifficulty === 'HARD' ? 'lightgray' : 'white',
              padding : '5px',
              cursor : 'pointer'
            }}
          >
            HARD
          </div>
        </div>
      </div>

      {/* 과외 설명 */}
      <div>
        <div style={{display : 'flex', alignItems : 'center'}}>
          <h3>과외 설명</h3>
          <div style={{marginLeft : '5px'}}>{descriptionValid ? '✅' : '🔲'}</div>
        </div>
        <input type="text"
          value={lessonDescription}
          onChange={handleLessonDescription}
          placeholder='과외 설명'
        />
      </div>

      {/* 유튜브 링크 */}
      <div>
        <h3>맛보기 영상 링크(선택사항)</h3>
        <div>
          <input type="text"
            value={lessonVideoUrl}
            onChange={handleVideoUrl}
            placeholder='맛보기 영상의 주소를 올려주세요!'
            />
        </div>
      </div>
      
      <div style={{display : 'flex', alignItems : 'center'}}>
      <h3>준비물 입력</h3>
      <div style={{marginLeft : '5px'}}>{materialValid ? '✅' : '🔲'}</div>
      </div>
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