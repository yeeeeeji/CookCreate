// import React, { useState, useEffect } from "react";
// import SideBar from './SideBar';
// import { useSelector} from "react-redux";
// import axios from "axios";

// function Review(props) {
//   const accessToken = useSelector((state) => state.auth.access_token);
//   const cookyerId = useSelector((state) => state.auth.id);
//   const [reviews, setReviews] = useState([]);
//   const [grade, setGrade] = useState([]);
//   const gradeMessage = grade.count === 0 ? "받은 별점이 없습니다." : "";
//   const reviewsMessage = reviews[0]?.lessonId === 0 ? "받은 리뷰가 없습니다." : "";

//     //평점 불러오기
//     useEffect(() => {
//       axios
//         .get(`api/v1/review/avg/${cookyerId}`, {
//           headers: {
//             Access_Token: accessToken,
//           },
//         })
//         .then((res) => {
//           setGrade(res.data);
//           console.log("평점",grade);
//         })
//         .catch((err) => {
//           console.log("평점에러",err);
//         });
//     }, [accessToken,grade]);

//     //리뷰 불러오기
//     useEffect(() => {
//       axios
//         .get(`api/v1/review/${cookyerId}`, {
//           headers: {
//             Access_Token: accessToken,
//           },
//         })
//         .then((res) => {
//           setReviews(res.data);
//           console.log("리뷰목록",reviews);
//         })
//         .catch((err) => {
//           console.log("평점에러",err);
//         });
//     }, [accessToken,reviews]);

//   return (
//     <div>
//       <SideBar />
//       <section>
//         <div className="header">
//           <h2 className="header_title">받은 리뷰</h2>
//         <h2 className="section_title">
//           평균별점:
//         </h2>
//         <div>
//         </div>
//         </div>
//         <ul className="caution_list">
//           <div className="caution_list_item">
//             <div>
//             </div>
//           </div>
//         </ul>
//         <section className="review">
//         {reviewsMessage ? (
//           <div className="noreview">{reviewsMessage}</div>
//         ) : (
//           // 리뷰 있는 경우
//           reviews.map((review) => (
//             <div className="pay_item" key={review.id}>
//           <div className="review_box">
//             <div className="review_item">
//               <div className="review_cont">
//                 <a href="dd" className="review_link">강좌이름</a>
//                 <div className="review_star">
//                   ⭐️⭐️⭐️⭐️ 4.2
//                 </div>
//                 <div className="review_author">
//                   작성자/아이디
//                 </div>
//                 <div className="review_tutor">
//                   선생님닉네임/이름
//                 </div>
//                 <div className="review_cont">
//                   리뷰내용
//                   <div className="review_cont">
//                     맛있었구요.....
//                   </div>
//                 </div>
//                 <div className="review_fun">
//                   <button type="button" className="review_btn">
//                     <i className="review_icon">🔍</i>
//                     <span className="review_btn_txt">자세히보기</span>
//                     </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </section>
//       </section>
//     </div>
//   );
// }

// export default Review;

import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import axios from "axios";

function Review(props) {
  const accessToken = useSelector((state) => state.auth.access_token);
  const cookyerId = useSelector((state) => state.auth.id);
  const [reviews, setReviews] = useState([]);
  const [grade, setGrade] = useState([]);
  const reviewsMessage = reviews[0]?.lessonId === 0 ? "받은 리뷰가 없습니다." : "";

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
  }, [accessToken]);

  return (
    <div>
      <SideBar />
      <section>
        <div className="header">
          <h2 className="header_title">받은 리뷰:{grade.count}개</h2>
          <h2 className="section_title">평균별점:{grade.avg}</h2>
          <div></div>
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
            reviews.map((review) => (
              <div className="review_item" key={review.id}>
                <div className="review_box">
                  <div className="review_cont">
                    <a href="dd" className="review_link">
                      {review.lessonTitle}
                    </a>
                    <div className="review_star">⭐️⭐️⭐️⭐️ {review.rating}</div>
                    <div className="review_author">작성자/아이디: {review.userId}</div>
                    <div className="review_tutor">
                      선생님닉네임/아이디: {review.cookyerName}/{review.cookyerId}
                    </div>
                    <div className="review_cont">
                      리뷰내용:{review.reviewContents}
                      <div className="review_cont">{review.content}</div>
                    </div>
                    <div className="review_fun">
                      <button type="button" className="review_btn">
                        <i className="review_icon">🔍</i>
                        <span className="review_btn_txt">자세히보기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
}

export default Review;
