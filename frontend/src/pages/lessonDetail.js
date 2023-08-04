import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import IntroduceLesson from '../component/LessonDetail/IntroduceLesson';
import IntroduceCookyer from '../component/LessonDetail/IntroduceCookyer';
import LessonReview from '../component/LessonDetail/LessonReview';
import CookieeNumber from '../component/LessonDetail/CookieeNumber';
import ApplyLesson from '../component/LessonDetail/ApplyLesson';
import LessonSchedule from '../component/LessonDetail/LessonSchedule';
function LessonDetail() {
  const lessonId = useSelector((state) => state.lessonInfo.lessonId)  
  const accessToken = useSelector((state) => state.auth.access_token)
  const [categoryName, setCategoryName] = useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [description, setDescription] = useState('')
  const [materials, setMaterials] = useState([])
  const [cookyerName, setCookyerName] = useState('')
  const [remaining, setRemaining] = useState(0)
  const [maximum, setMaximum] = useState(0)
  const [price, setPrice] = useState(0)
  const [jjimCount, setJjimCount] = useState(0)
  const [videoUrl, setVideoUrl] = useState('')
  const [timeTaken, setTimeTaken] = useState(0)
  const [lessonDate, setLessonDate] = useState('')
  useEffect(() => {
    axios.get(`/api/v1/lesson/${lessonId}`, {
      headers : {
        Access_Token : accessToken
      }
    })
    .then((res) => {
      console.log(res.data)
      setCategoryName(res.data.categoryName)
      setLessonTitle(res.data.lessonTitle)
      setThumbnailUrl(res.data.thumbnailUrl)
      setDifficulty(res.data.difficulty)
      setDescription(res.data.description)
      setMaterials(res.data.materials)
      setCookyerName(res.data.cookyerName)
      setRemaining(res.data.remaining)
      setMaximum(res.data.maximum)
      setPrice(res.data.price)
      setJjimCount(res.data.jjimCount)
      setVideoUrl(res.data.videoUrl)
      setLessonDate(res.data.lessonDate)
      setTimeTaken(res.data.timeTaken)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [lessonId])
  return (
    <div>
      <br />
      {categoryName}
      <h2>
        {lessonTitle}
      </h2>
      <img src={thumbnailUrl} alt="" />
      <IntroduceLesson
        difficulty = {difficulty}
        description = {description}
        materials = {materials}
      />
      <IntroduceCookyer
        cookyerName = {cookyerName}
      />
      <LessonReview/>

      <CookieeNumber 
        remaining = {remaining}
        maximum = {maximum}
      />
      <ApplyLesson
        price = {price}
        lessonId = {lessonId}
        jjimCount = {jjimCount}
        videoUrl = {videoUrl}
      />
      <LessonSchedule
        timeTaken = {timeTaken}
        lessonDate = {lessonDate}
      />
    </div>
  );
}

export default LessonDetail;