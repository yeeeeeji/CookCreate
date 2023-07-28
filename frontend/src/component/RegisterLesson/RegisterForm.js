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
  const register = (e) => {
    e.preventDefault()
    const data = {
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
      thumbnailUrl,
      lessonStepList
    }
    axios
    .post(`api/v1/lesson`,
    data,
    {
      headers: {
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
      <button onClick={register}>과외 등록하기</button>

    </div>
  );
}

export default RegisterForm;