import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from 'react-modal';
import ReviewDetailT from "./ReviewDetailT";

//별점
import StarShow from "./StarShow";
import { useNavigate } from "react-router";
import { setLessonId } from "../../store/lesson/lessonInfo";



function Review() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector((state) => state.auth.access_token);
  const cookyerId = useSelector((state) => state.auth.id);
  const [reviews, setReviews] = useState([]);
  const [grade, setGrade] = useState([]);
  const reviewsMessage = reviews[0]?.lessonId === 0 ? "받은 리뷰가 없습니다." : "";
  //모달관련
  const [selectedReviewId, setSelectedReviewId] = useState(null); // 선택된 리뷰의 reviewId
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** 이동할 과외 아이디 */
  const [ goLessonDetail, setGoLessonDetail ] = useState(false)
  const lessonId = useSelector((state) => state.lessonInfo.lessonId)


  const handleOpenModal = (reviewId) => {
    setSelectedReviewId(reviewId); // 선택한 리뷰의 reviewID저장
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root"); 
  }, []);




  //평점 불러오기
  useEffect(() => {
    axios
      .get(`api/v1/review/avg/${cookyerId}`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        setGrade(res.data);
        console.log("평점", grade);
      })
      .catch((err) => {
        console.log("평점에러", err);
      });
  }, [accessToken]);

  //리뷰불러오기
  useEffect(() => {
    if (accessToken) {
      axios
        .get(`api/v1/review/${cookyerId}`, {
          headers: {
            Access_Token: accessToken,
          },
        })
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          console.log("리뷰에러", err);
        });
    }
  }, [accessToken]);

  const goLesson = (lessonId) => {
    setGoLessonDetail(true)
    dispatch(setLessonId(lessonId))
    navigate(`/lesson/${lessonId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  useEffect(() => {
    if (goLessonDetail && lessonId !== null) {
      navigate(`/lesson/${lessonId}`)
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }
  }, [lessonId])

  return (
    <div>
      <SideBar />
      <section>
        <div className="my-class-title-wrap">
          <h3 className="my-class-title">리뷰 목록</h3>
        </div>
        <div>
          <h3 className="my-subtitle">받은 리뷰:{grade.count}개</h3>
          <h2 className="my-subtitle">평균별점:{grade.avg}</h2>
        </div>
        <ul className="caution_list">
          <div className="caution_list_item">
            <div></div>
          </div>
        </ul>
        <section className="review">
          {reviewsMessage ? (
            <div className="noreview">{reviewsMessage}</div>
          ) : (
            reviews &&
              reviews.map((review) => (
                <div className="review_item" key={review.id}>
                  <div className="review_box">
                    <div className="review_cont">
                      <div className="review_link" onClick={() => goLesson(review.lessonId)}>
                        {review.lessonTitle}
                      </div>
                      <StarShow rating={review.rating} size="1.4rem" color="gold" />
                      <div>{review.rating}</div>
                      <div className="review_author">작성자: {review.nickname}</div>
                      <div className="review_tutor">
                        선생님: {review.cookyerName}
                      </div>
                      <div className="review_cont">
                        리뷰내용:{review.reviewContents}
                        <div className="review_cont">{review.content}</div>
                      </div>
                      <div className="review_fun">
                        <button type="button" className="review_btn" onClick={() =>handleOpenModal(review.reviewId)}>
                          <i className="review_icon">🔍</i>
                          <span className="review_btn_txt">자세히보기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            
          )}
          {/* <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}> */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            style={{
              content: {
                width: '30%',   // 모달의 너비
                height: '50%',  // 모달의 높이
                top: '50%',     // 화면 세로 중앙
                left: '50%',    // 화면 가로 중앙
                transform: 'translate(-50%, -50%)', // 모달을 중앙으로 이동
              },
            }}
          >
            <ReviewDetailT reviewId={selectedReviewId} onClose={handleCloseModal} />
          </Modal>
        </section>
      </section>
    </div>
  );
}

export default Review;
