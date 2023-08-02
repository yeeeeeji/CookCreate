import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
function RegisterForm() {
  const [lessonThumbnailUrl, setLessonThumbnailUrl] = useState('')
  const [ThumbnailFile, setThumbnailFile] = useState(null)
  const accessToken = useSelector((state) => state.auth.access_token)
  const lessonTitle = useSelector((state) => state.lesson.lessonTitle)
  const categoryId = useSelector((state) =>  parseInt(state.lesson.categoryId))+1
  const maximum = useSelector((state) => parseInt(state.lesson.maximum))
  const price = useSelector((state) => parseInt(state.lesson.price))
  const lessonDate = useSelector((state) => state.lesson.lessonDate).slice(0,-5)
  const difficulty = useSelector((state) => state.lesson.difficulty)
  const timeTaken = useSelector((state) => parseInt(state.lesson.timeTaken))
  const description = useSelector((state) => state.lesson.description)
  const materials = useSelector((state) => state.lesson.materials)
  const videoUrl = useSelector((state) => state.lesson.videoUrl)
  // const thumbnailUrl = useSelector((state) => state.lesson.thumbnailUrl)
  const lessonStepList = useSelector((state) => state.lesson.lessonStepList)

  const categoryValid = useSelector((state) => state.lesson.categoryValid)
  const titleValid = useSelector((state) => state.lesson.titleValid)
  const maxValid = useSelector((state) => state.lesson.maxValid)
  const priceValid = useSelector((state) => state.lesson.priceValid)
  const dateValid = useSelector((state) => state.lesson.dateValid)
  const difficultyValid = useSelector((state) => state.lesson.difficultyValid)
  const timeTakenValid = useSelector((state) => state.lesson.timeTakenValid)
  const materialsValid = useSelector((state) => state.lesson.materialsValid)
  const stepValid = useSelector((state) => state.lesson.stepValid)
  const descriptionValid = useSelector((state) => state.lesson.descriptionValid)
  const isAllValid = [categoryValid, titleValid, maxValid, priceValid, dateValid, difficultyValid, timeTakenValid, materialsValid, stepValid, descriptionValid].every((isValid) => isValid);

  const formData = new FormData();

  const handleThumbnailUrl = (e) => {
    setLessonThumbnailUrl(e.target.value) // 파일명 유저들에게 보여주기
    const temp = e.target.files[0]
    // console.log(e.target.files[0])
    setThumbnailFile(temp)
    console.log(`tmp : ${temp}`, `thumbnailFile : ${ThumbnailFile}`)
    formData.append('thumbnailUrl', temp);
    for (let value of formData.values()) {
      console.log(value, '썸네일 등록');
    }
  };

  console.log(formData)
  const register = (e) => {
    console.log('test22', formData.get('thumbnailUrl'))
    // for (let value of formData.values()) {
    //   console.log(value, '등록 함수');
    // }
    e.preventDefault();
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
    .post(`api/v1/lesson`, formData, {
      headers: {
        Access_Token : accessToken,
        'Content-Type': 'multipart/form-data', // multipart/form-data 설정 추가
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  return (
    <div>
      {/* 썸네일 */}
      <div>
        <h3>과외 썸네일</h3>
        <div>
          <input type="file"
            name = "filename"
            value={lessonThumbnailUrl}
            onChange={handleThumbnailUrl}
          />
        </div>
      </div>
    <button onClick={register} >과외 등록하기</button>
  </div>
  );
}

export default RegisterForm;