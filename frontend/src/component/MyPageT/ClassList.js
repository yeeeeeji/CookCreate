import React,{useEffect, useState} from 'react';
import SideBar from "./SideBar";
import { useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { initOVSession, setIsSessionOpened, setSessionId, setVideoLessonId } from '../../store/video/video';
import { OpenVidu } from 'openvidu-browser';
import { useNavigate } from 'react-router-dom';
import { setClassData, setCompletedData } from '../../store/mypageS/accountS';
import { setLessonId } from '../../store/lesson/lessonInfo';
import AlertModal from '../Modal/AlertModal';
import SelectModal from '../Modal/SelectModal';


//시간 포맷
const displayTime = (dateTime) => {
  if (!dateTime) return null;

  const localDate = new Date(dateTime);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    timeZone: 'Asia/Seoul', // 시간대를 UTC로 설정 (한국 시간으로 하는게 맞는 거 같다)
  };
  return localDate.toLocaleString(undefined, options);
};


function ClassList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('access_token')

  const classData = useSelector((state) => state.accountS.classData)
  const completedData = useSelector((state) => state.accountS.completedData)
  // const [ classData, setClassData ] = useState([]);
  // const [ completedData, setCompletedData ] = useState([]);

  /** 쿠커 화상과외방 입장 */
  const session = useSelector((state) => state.video.session)
  const sessionId = useSelector((state) => state.video.sessionId)
  const videoLessonId = useSelector((state) => state.video.videoLessonId)
  const isSessionOpened = useSelector((state) => state.video.isSessionOpened)

  /** 1시간 전부터 과외방 생성 가능 */ // 일단 새고해야 알 수 있는걸로..
  const currentDate = new Date()

  /** 이동할 과외 아이디 */
  const [ goLessonDetail, setGoLessonDetail ] = useState(false)
  const lessonId = useSelector((state) => state.lessonInfo.lessonId)
  
  /** 삭제 전 알림 모달 관련 */
  const [ showAlert, setShowAlert ] = useState(false)
  const [ deleteAction, setDeleteAction ] = useState(false)
  const [ deleteLessonId, setDeleteLessonId ] = useState(null)

  /** 삭제 후 알림 모달 관련 */
  const [ deleteContent, setDeleteContent ] = useState(null)
  const [ showCompletedAlert, setShowCompletedAlert ] = useState(false)

  const getClassList = () => {
    axios
      .get(`api/v1/my/applied`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        if (res.data[0].message !== "신청한 과외가 없습니다.") {
          dispatch(setClassData(res.data))
        } else {
          dispatch(setClassData(null))
        }
      })
      .catch((err) => {
        console.log("신청한 과외 조회 에러", err);
        // 에러 처리 로직 추가 가능
      });
  
    axios
      .get(`api/v1/my/completed`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        if (res.data[0].message !== "신청한 과외가 없습니다.") {
          dispatch(setCompletedData(res.data))
        } else {
          dispatch(setCompletedData(null))
        }
      })
      .catch((err) => {
        console.log("완료한 과외 조회 에러", err);
        // 에러 처리 로직 추가 가능
      });
  }

  useEffect(() => {
    getClassList()
  }, []);

  /** 쿠커 화상과외방 생성 및 입장 */
  const createRoom = ( lessonId ) => {
    // 0. 레슨아이디 스토어에 저장
    dispatch(setVideoLessonId(lessonId))
  }

  // 1. 레슨아이디가 잘 저장되면 선생님이 해당 수업 방 만들기 요청 보내기
  useEffect(() => {
    if (videoLessonId !== undefined) {
      console.log(videoLessonId, "레슨번호")
      console.log("토큰", accessToken)
      axios.post(
        `api/v1/session/create`,
        { 'lessonId': videoLessonId },
        {
          headers: {
            access_token: accessToken
          }
        })
        .then((res) => {
          // console.log('방 만들기 요청 성공', res)
          console.log('쿠커 세션아이디 생성 성공', res)
          const sessionId = res.data.token
          dispatch(setSessionId(sessionId))
          // dispatch(setMySessionId(res.data)) // 토큰이랑 커넥션 설정하는걸로 바꾸기?
        })
        .catch((err) => {
          console.log('쿠커 세션아이디 생성 실패', err)
        })
      
    } else {
      console.log("레슨아이디 없음")
    }
  }, [videoLessonId])

  // 2. 토큰이 생기면 이동 OV, session 객체 생성
  useEffect(() => {
    if (sessionId) {
      const newOV = new OpenVidu()
      const newSession = newOV.initSession()
      dispatch(initOVSession({OV: newOV, session: newSession}))
    }
  }, [sessionId])

  // 3. 세션이 생기면 방 열렸다 체크 / 쿠키는 바로 입장
  // useEffect(() => {
  //   if (session !== undefined) {
  //     navigate(`/videoLesson/${role}`)
  //   }
  // }, [session])

  useEffect(() => {
    if (session) {
      console.log("방 생김")
      dispatch(setIsSessionOpened(true))
    }
  }, [session])

  // **4.
  useEffect(() => {
    if (isSessionOpened && sessionId) {
      console.log(isSessionOpened, "방이 열렸어요")
      navigate(`/videoLesson/COOKYER`)
    }
  }, [isSessionOpened])

  /** 과외 수정 */
  const updateClass = ( lessonId ) => {
    navigate(`/lesson/edit/${lessonId}`)
    dispatch(setLessonId(lessonId))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** 과외 삭제 */
  const deleteClass = ( lessonId ) => {
    axios.delete(
      `api/v1/lesson/${lessonId}`,
      {
        headers: {
          Access_Token: accessToken
        }
      }
    )
    .then((res) => {
      console.log('쿠커 과외 삭제 성공', res)
      setDeleteContent("과외가 삭제되었습니다.")
      getClassList()
    })
    .catch((err) => {
      console.log('쿠커 과외 삭제 실패', err)
      let error = Object.assign({}, err)
      if (error?.response?.status === 409) {
        // alert('신청한 쿠키가 있어 수업을 삭제할 수 없습니다.')
        setDeleteContent("신청한 쿠키가 있어 과외를 삭제할 수 없습니다.")
      } else {
        setDeleteContent("과외를 삭제할 수 없습니다.")
      }
    })
  }

  const goLesson = (lessonId) => {
    setGoLessonDetail(true)
    dispatch(setLessonId(lessonId))
    navigate(`/lesson/${lessonId}`)
  }

  useEffect(() => {
    if (goLessonDetail && lessonId !== null) {
      navigate(`/lesson/${lessonId}`)
    }
  }, [lessonId])

  useEffect(() => {
    console.log("여기까지 오니?", deleteAction, deleteLessonId)
    if (deleteAction && deleteLessonId) {
      setShowAlert(false)
      deleteClass(deleteLessonId)
      setDeleteAction(false)
    }
  }, [deleteAction, deleteLessonId])

  const handleDeleteClass = (lessonId) => {
    setShowAlert(true)
    setDeleteLessonId(lessonId)
  }

  useEffect(() => {
    if (deleteContent) {
      setShowCompletedAlert(true)
    }
  }, [deleteContent])

  useEffect(() => {
    if (!showCompletedAlert) {
      setDeleteContent(null)
    }
  }, [showCompletedAlert])

  const handleDeleteAction = (data) => {
    console.log("handleDeleteAction", data)
    if (data) {
      setDeleteAction(data)
    } else {
      console.log("false일때")
      setShowAlert(data)
    }
  }

  return (
    <div className="container classlist">
      <SideBar />
        <div className="title">과외목록</div>
          <div>
            <div className="subtitle">신청한 과외</div>
            {/* {classData !== null && classData !== undefined && classData ? ( */}
            {classData ? (

              classData.map((lesson)=> (
                <div key={lesson.lessonId} className="classlist-list">
                  <img
                    loading="lazy"
                    src={lesson.thumbnailUrl}
                    className="swiper-lazy" // swiper-lazy가 className이면 안될거같은데
                    alt="course_title.png"
                  />
                  <div className="describe">
                    <div className="row class_title">
                      <div className="col1">과외명</div>
                      <div className="col2" onClick={() => goLesson(lesson.lessonId)}>{lesson.lessonTitle}</div>
                    </div>
                    <div className="row class_category">
                    <div className="col1">카테고리</div>
                      <div className="col2">
                        {(() => {
                          switch (lesson.categoryId) {
                            case 0:
                              return "한식";
                            case 1:
                              return "양식";
                            case 2:
                              return "중식";
                            case 3:
                              return "일식";
                            case 4:
                              return "아시안";
                            case 5:
                              return "건강식";
                            case 6:
                              return "디저트";
                            default:
                              return "알 수 없음";
                          }
                        })()}
                    </div>
                  </div>
                  <div className="row class_cookyer">
                    <div className="col1">쿠커</div> 
                    <div className="col2">{lesson.cookyerName}</div>
                  </div>
                  <div className="row class_date">
                    <div className="col1">과외 날짜</div>
                      {/* <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_calendar.png" alt="기간아이콘" width="29" /> */}
                    <div className="col2">
                      {lesson.lessonDate} 예정
                    </div>
                  </div>
                  </div> {/**descibe 태그 끝 */}
                  {lesson ? (
                    <div>{displayTime(lesson.lessonDate)}</div>
                  ) : (
                    null
                  )}

                  {new Date(lesson.lessonDate) <= new Date((new Date()).setHours(new Date().getHours() + 1)) ? (
                    <button onClick={() => createRoom(lesson.lessonId)}>수업시작</button>
                  ) : (
                    <button disabled={true}>수업시작</button>
                  )}

                  <div className="info_ea">
                    <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_people.png" alt="수강아이콘" width="29" style={{ paddingRight: "5px", verticalAlign: "text-bottom" }} />
                    <b>"{lesson.remaining}"명 남음.</b>
                      최대인원:{lesson.maximum}명
                  </div>

                  <div className="rating">
                    <div className="rating_star">
                      <div className="star_solid" style={{ width: "98.26086956521738%" }}>
                        {/* ... (rest of the code) ... */}
                      </div>
                    </div>
                    <div className="tags">
                      <button onClick={() => updateClass(lesson.lessonId)}>수정</button>
                      <button onClick={() => handleDeleteClass(lesson.lessonId)}>삭제</button>
                      {/* <button onClick={() => deleteClass(lesson.lessonId)}>삭제</button> */}
                      {showAlert ? (
                        <SelectModal content={'정말로 삭제하시겠습니까?'} path={null} actions={handleDeleteAction}/>
                      ) : null}
                      {showCompletedAlert ? (
                        <AlertModal content={deleteContent} path={null} actions={setShowCompletedAlert} data={false}/>
                      ) : null}
                    </div>
                  </div>
                  </div>

              ))
              ) : (
                <p>신청한 과외가 없습니다.</p>
              )}
          </div>
        </div>
  );
}

export default ClassList;