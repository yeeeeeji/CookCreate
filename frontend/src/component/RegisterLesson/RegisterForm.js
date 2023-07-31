import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
function RegisterForm() {
  const accessToken = useSelector((state) => state.auth.token)
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
  const thumbnailUrl = useSelector((state) => state.lesson.thumbnailUrl)
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

  const register = (e) => {
    e.preventDefault()
    const lessonPostReq  = {
      lessonTitle, 
      categoryId, 
      maximum,
      price, 
      lessonDate, 
      difficulty,
      timeTaken, 
      description, 
      materials,
      videoUrl, 
      lessonStepList
    }
    // const formData = new FormData();
    // formData.append('thumbnailUrl', File); 
    
    axios
    .post(`api/v1/lesson`,
    lessonPostReq,
    {
      headers: {
        'Content-Type': 'application/json',
        Access_Token: accessToken,
      },
    })
    .then((res) =>{
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })
  }
  return (
    <div>
      <button onClick={register} disabled={!isAllValid}>과외 등록하기</button>

    </div>
  );
}

export default RegisterForm;