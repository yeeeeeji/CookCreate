import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ReviewForm from "./ReviewForm";
import Modal from 'react-modal';
import '../../style/classlist.css'
import SideBar from "./SideBar";




function ClassList() {
  const accessToken = useSelector((state) => state.auth.access_token);
  console.log("토큰",accessToken);
  const [classData, setClassData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [reviewLessonId, setReviewLessonId] = useState(null);
  // const [showCompletedLectures, setShowCompletedLectures] = useState(false);

  useEffect(() => {
    axios
      .get(`api/v1/my/applied`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        setClassData(res.data);
        console.log("신청한 과외", res.data);
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
        setCompletedData(res.data);
        console.log("완료한 과외", res.data);
      })
      .catch((err) => {
        console.log("완료한 과외 조회 에러", err);
        // 에러 처리 로직 추가 가능
      });
    }, []);

    // const handleSelectChange = (e) => {
    //   const selectedValue = e.target.value;
    //   if (selectedValue === "completed" ) {
    //     setShowCompletedLectures(true);
    //   } else {
    //     setShowCompletedLectures(false);
    //   }
    // };

    //모달

    const handleOpenModal = (lessonId) => {
      setIsModalOpen(true);
      setReviewLessonId(lessonId)
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      Modal.setAppElement("#root"); 
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    //리뷰폼 소통
    const [rating, setRating] = useState(1);
    // const [contents, setContents] = useState('');

    const handleClickRating = (value) => {
      setRating(value);
      console.log("classlist 핸들클릭", rating)
    };

    // handleReviewSubmit = (contents, ratingValue) => {
    //   setContents(contents);
    //   setRating(ratingValue);
    //   setIsModalOpen(false);
    // }

    return (
      <div>
        <SideBar />
        {/* <button >리뷰작성</button> */}
        {/* {isModalOpen && <ReviewForm onClose={handleCloseModal} />} */}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <ReviewForm onClose={handleCloseModal} rating={rating} onClickRating={handleClickRating} lessonId={reviewLessonId} />
        </Modal>
        <div className="column is-10 main_container">
          <div className="header">
            <div className="summary">
              <dl className="summary__count">
                {/* <dt>과외 목록</dt> */}
                <h1>과외목록</h1>
                {/* <dd className="summary__count-all">2</dd> */}
              </dl>
            </div>
          </div>
            <div>
              <h2>신청한 과외</h2>
              {classData.map((lesson)=> (
            <div key = {lesson.lessonId} className="columns is-multiline is-mobile courses_card_list_body">
              <div className="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile ">
                <div
                  className="card course course_card_item"
                  data-productid="324582"
                  fxd-data='{"courseId":324582,"regPrice":0,"isInCart":false}'
                  data-gtm-vis-recent-on-screen-8964582_476="200"
                  data-gtm-vis-first-on-screen-8964582_476="200"
                  data-gtm-vis-total-visible-time-8964582_476="100"
                  data-gtm-vis-has-fired-8964582_476="1"
                >
                  <a className="course_card_front" href="ㅔㅔㅔㅔ">
                    <div className="card-image">
                      <figure className="image is_thumbnail">
                        <img
                          loading="lazy"
                          src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
                          data-src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
                          className="swiper-lazy"
                          alt="course_title.png"
                        />
                        <div className="onload_placeholder"></div>
                        <div className="swiper-lazy-preloader"></div>
                      </figure>
                      <span className="course_cnt">강의번호:{lesson.lessonId}</span>
                    </div>
                    <div className="card-content">
                      <div className="course_title">강좌명:{lesson.lessonTitle}</div>
                      <div className="course_title">
                      <dt>카테고리</dt>
                        <dd>
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
                        </dd>
                      </div>
                      <div className="instructor">쿠커: {lesson.cookyerName}({lesson.cookyerId})</div>
                      <div className="date">신청날짜: {lesson.createdDate}</div>
                      <div className="price">가격:{lesson.price}</div>
                      <div className="difficulty">난이도:{lesson.difficulty}</div>
                      <div className="time">찜:{lesson.jjimCount}</div>
                      <div className="view2_summary_info">
                        <dl className="info_delivery">
                          <dt>
                            <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_clock2.png" alt="시간아이콘" width="29" />
                            "소요시간"
                          </dt>
                          <dd>{lesson.timeTaken}분</dd>
                        </dl>
                        <dl className="info_delivery">
                          <dt>
                            <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_calendar.png" alt="기간아이콘" width="29" />
                            "과외 날짜"
                          </dt>
                          <dd>{lesson.lessonDate} 예정</dd>
                        </dl>
                        <div className="info_ea">
                          <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_people.png" alt="수강아이콘" width="29" style={{ paddingRight: "5px", verticalAlign: "text-bottom" }} />
                          <b>"{lesson.remaining}"명 남음.</b>
                            최대인원:{lesson.maximum}명
                        </div>
                      </div>
                      <div className="rating">
                        <div className="rating_star">
                          <div className="star_solid" style={{ width: "98.26086956521738%" }}>
                            {/* ... (rest of the code) ... */}
                          </div>
                        </div>
                        <p className="card-content__notice"></p>
                        <div className="tags">
                          <span className="tag" style={{ backgroundColor: "hsl(321,63%,90%)" }}>
                            수정시간:{lesson.modifiedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
              ))}
            </div>
            <div>
              <h2>완료한 과외</h2>
              {completedData.map((lesson)=> (
            <div key = {lesson.lessonId} className="columns is-multiline is-mobile courses_card_list_body">
              <div className="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile ">
                <div
                  className="card course course_card_item"
                  data-productid="324582"
                  fxd-data='{"courseId":324582,"regPrice":0,"isInCart":false}'
                  data-gtm-vis-recent-on-screen-8964582_476="200"
                  data-gtm-vis-first-on-screen-8964582_476="200"
                  data-gtm-vis-total-visible-time-8964582_476="100"
                  data-gtm-vis-has-fired-8964582_476="1"
                >
                  <a className="course_card_front" href="ㅔㅔㅔㅔ">
                    <div className="card-image">
                      <figure className="image is_thumbnail">
                        <img
                          loading="lazy"
                          src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
                          data-src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
                          className="swiper-lazy"
                          alt="course_title.png"
                        />
                        <div className="onload_placeholder"></div>
                        <div className="swiper-lazy-preloader"></div>
                      </figure>
                      <span className="course_cnt">강의번호:{lesson.lessonId}</span>
                    </div>
                    <div className="card-content">
                      <div className="course_title">강좌명:{lesson.lessonTitle}</div>
                      <div className="course_title">
                      <dt>카테고리</dt>
                        <dd>
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
                        </dd>
                      </div>
                      <div className="instructor">쿠커: {lesson.cookyerName}({lesson.cookyerId})</div>
                      <div className="date">신청날짜: {lesson.createdDate}</div>
                      <div className="price">가격:{lesson.price}</div>
                      <div className="difficulty">난이도:{lesson.difficulty}</div>
                      <div className="time">찜:{lesson.jjimCount}</div>
                      <div className="view2_summary_info">
                        <dl className="info_delivery">
                          <dt>
                            <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_clock2.png" alt="시간아이콘" width="29" />
                            "소요시간"
                          </dt>
                          <dd>{lesson.timeTaken}분</dd>
                        </dl>
                        <dl className="info_delivery">
                          <dt>
                            <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_calendar.png" alt="기간아이콘" width="29" />
                            "과외 날짜"
                          </dt>
                          <dd>{lesson.lessonDate} 예정</dd>
                        </dl>
                        <div className="info_ea">
                          <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_people.png" alt="수강아이콘" width="29" style={{ paddingRight: "5px", verticalAlign: "text-bottom" }} />
                          <b>"{lesson.remaining}"명 남음.</b>
                            최대인원:{lesson.maximum}명
                        </div>
                      </div>
                      <div className="rating">
                        <div className="rating_star">
                          <div className="star_solid" style={{ width: "98.26086956521738%" }}>
                            {/* ... (rest of the code) ... */}
                          </div>
                        </div>
                        <p className="card-content__notice"></p>
                        <div className="tags">
                          <span className="tag" style={{ backgroundColor: "hsl(321,63%,90%)" }}>
                            수정시간:{lesson.modifiedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <button onClick={() => handleOpenModal(lesson.lessonId)}>리뷰작성</button>
            </div>
              ))}
            </div>
        </div>
      </div>
    );
}

export default ClassList;

