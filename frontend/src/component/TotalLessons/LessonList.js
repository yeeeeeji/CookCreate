import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import LessonItem from './LessonItem';
import { useSelector } from 'react-redux';
import axios from 'axios'


function LessonList() {
  const [lessons, setLessons] = useState([])
  const type = useSelector((state) => state.lessonInfo.type)
  const deadline = useSelector((state) => state.lessonInfo.deadline)
  const order = useSelector((state) => state.lessonInfo.order)
  const category = useSelector((state) => state.lessonInfo.category)
  const keyword = useSelector((state) => state.lessonInfo.keyword)
  const test = async() => {
    axios.get(`api/v1/lesson`, 
      // {type, keyword, category, order, deadline}
      {'type' : type, 'keyword' : keyword,  'category' : category, 'order' : order,'deadline' : deadline}
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => { 
        console.log(type, typeof(type), deadline, typeof(deadline), order, typeof(order),
         category, typeof(category), typeof(keyword), keyword)
      })
  }
  useEffect(() => {
    if (type !== undefined && keyword !== undefined && category !== undefined && order !== undefined && deadline) {
      test()
      // axios.get(`api/v1/lesson`, 
      // // {type, keyword, category, order, deadline}
      // {'type' : type, 'keyword' : keyword,  'category' : category, 'order' : order,'deadline' : deadline}
      // )
      // .then((res) => {
      //   console.log(res.data)
      // })
      // .catch((err) => { 
      //   console.log(type, typeof(type), deadline, typeof(deadline), order, typeof(order),
      //    category, typeof(category), typeof(keyword), keyword)
      // })
    }
    console.log("여기까지 왔니")
  }, [type, keyword, category, order, deadline])
  return (
    <div>
      for문 돌며 뽑아내기
      <LessonItem/>
      {lessons.map((lesson) => (
        // 각 레슨의 ID를 이용하여 Link를 생성합니다.
        <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
          <h3>{lesson.lesson_title}</h3>
          <p>{lesson.lesson_date}</p>
        </Link>
      ))}
    </div>
  );
}

export default LessonList;