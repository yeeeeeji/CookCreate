import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function LessonReview() {
  const accessToken = localStorage.getItem("access_token");
  const lessonId = useSelector((state) => state.lessonInfo.lessonId);
  const [ReviewGrade, setReviewGrade] = useState("");
  const [Reviews, setReveiws] = useState([]);
  const [cookyerId, setCookyerId] = useState(null);

  //평점 불러오기
  // useEffect(() => {
  //   if (lessonId) {
  //     axios
  //       .get(`/api/v1/lesson/${lessonId}`, {
  //         headers: {
  //           Access_Token: accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         console.log('리뷰평점1', res.data);
  //         setReviewGrade(res.data)
  //       })
  //       .catch((err) => {
  //         console.log('평점 에러', err);
  //       });
  //   }
  // }, [lessonId]);

  useEffect(() => {
    if (ReviewGrade) {
      setCookyerId(ReviewGrade.cookyerId);
    }
  }, [ReviewGrade]);

  // const cookyerId = ReviewGrade.cookyerId;

  useEffect(() => {
    if (lessonId) {
      axios
        .get(`/api/v1/lesson/${lessonId}`, {
          headers: {
            Access_Token: accessToken,
          },
        })
        .then((res) => {
          console.log("리뷰평점1", res.data);
          setReviewGrade(res.data);
        })
        .catch((err) => {
          console.log("평점 에러", err);
        });
    }
  }, [lessonId]);

  console.log("리뷰평점2", ReviewGrade);
  console.log("쿠커아이디", cookyerId);

  //리뷰불러오기
  useEffect(() => {
    if (accessToken && cookyerId) {
      axios
        .get(`/api/v1/review/${cookyerId}`, {
          headers: {
            Access_Token: accessToken,
          },
        })
        .then((res) => {
          setReveiws(res.data);
        })
        .catch((err) => {
          console.log("리뷰에러", err);
        });
      }
    }, [accessToken, cookyerId]);
    
    console.log("리뷰리스트", Reviews);

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
        border: "0.7px solid #ccc",
        borderRadius: "3px",
        padding: "1rem",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: "500",
          }}
        >
          리뷰
        </h3>
        <div>
            {ReviewGrade.reviewCnt > 0 ? (
          <div>
            <div>평균: {ReviewGrade.reviewAvg.toFixed(2)}점</div>
            <div>갯수: {ReviewGrade.reviewCnt}개</div>
          </div>
        ) : null }
        </div>
      </div>
      <div>
        {ReviewGrade.reviewCnt > 0 ? (
          <div>
            {Reviews.map((content, reviewId)=>(
              // <div key={reviewId}>{content.nickname}</div>
              <div key={reviewId}>
                <div>{content.nickname}</div>
                <div>{content.reviewContents}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>작성된 리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default LessonReview;
