// import React from "react";
// import React, {useState} from "react";
import axios from "axios";
// import React from "react";
import { useSelector } from "react-redux";
import '../../style/classlist.css'
import SideBar from "./SideBar";


import React, {useState, useEffect} from "react";
import ReviewForm from "./ReviewForm";
import Modal from 'react-modal';



function ClassList() {
  const accessToken = useSelector((state) => state.auth.access_token);
  console.log("토큰",accessToken);
  // const [classData, setClassData] = useState({});
  // const [showCompletedLectures, setShowCompletedLectures] = useState(false);

  //신청한 과외 조회
  axios
    .get(`api/v1/my/applied`, {
      headers: {
        Access_Token: accessToken,
      },
    })
    .then((res) => {
      console.log("신청한 과외",res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  
  //완료한 과외 조회
  axios
    .get(`api/v1/my/completed`, {
      headers: {
        Access_Token: accessToken,
      },
    })
    .then((res) => {
      console.log("완료한 과외",res.data);
    })
    .catch((err) => {
      console.log("완료한 과외",err);
    });
  

    // const handleSelectChange = (e) => {
    //   const selectedValue = e.target.value;
    //   if (selectedValue === "completed" ) {
    //     setShowCompletedLectures(true);
    //   } else {
    //     setShowCompletedLectures(false);
    //   }
    // };

    //모달

    const handleOpenModal = () => {
      setIsModalOpen(true);
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
        <button onClick={handleOpenModal}>리뷰작성</button>
        {/* {isModalOpen && <ReviewForm onClose={handleCloseModal} />} */}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <ReviewForm onClose={handleCloseModal} rating={rating} onClickRating={handleClickRating} />
        </Modal>
        <div className="column is-10 main_container">
          <div className="header">
            <div className="summary">
              <dl className="summary__count">
                <dt>전체</dt>
                <dd className="summary__count-all">2</dd>
              </dl>
              <div className="my-likes__orders">
                <div className="ac-dropdown e-order-default my-likes__dropdown  hidden-default-icon">
                  {/* <select name="order" className="" onChange={handleSelectChange} > */}
                  <select name="order" className=""  >
                    <option value="applied">신청한 강의</option>
                    <option value="completed">완료한 강의</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline is-mobile courses_card_list_body">
            <div className="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile ">
              <div
                className="card course course_card_item"
                data-productid="324582"
                fxd-data='{"courseId":324582,"regPrice":0,"isInCart":false}'
                data-gtm-vis-recent-on-screen-8964582_476="420"
                data-gtm-vis-first-on-screen-8964582_476="420"
                data-gtm-vis-total-visible-time-8964582_476="100"
                data-gtm-vis-has-fired-8964582_476="1"
              >
                <a className="course_card_front e_course_click" href="/course/따라하며-배우는-노드-리액트-유튜브-만들기">
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
                    <span className="course_cnt">강의번호</span>
                  </div>
                  <div className="card-content">
                    <div className="course_title">단호박 파스타 만들기 강좌</div>
                    <div className="instructor">쿠커: John Ahn(선생님이름)</div>
                    <div className="date">신청날짜</div>
                    <div className="price">가격</div>
                    <div className="difficulty">난이도</div>
                    <div className="time">소요시간</div>
                    <div className="view2_summary_info">
                      <dl className="info_delivery">
                        <dt>
                          <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_clock2.png" alt="시간아이콘" width="29" />
                          "강의시간"
                        </dt>
                        <dd>90분</dd>
                      </dl>
                      <dl className="info_delivery">
                        <dt>
                          <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_calendar.png" alt="기간아이콘" width="29" />
                          "강의 날짜"
                        </dt>
                        <dd>22.06.07일 예정</dd>
                      </dl>
                      <div className="info_ea">
                        <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_people.png" alt="수강아이콘" width="29" style={{ paddingRight: "5px", verticalAlign: "text-bottom" }} />
                        <b>4/6</b>
                        "명 수강"
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
                          4/6명
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ClassList;

// import React from "react";

// function ClassList() {

  
//   return (
//     <div>
//       <div className="column is-10 main_container">
//         <div className="header">
//           <div className="summary">
//             <dl className="summary__count">
//               <dt>전체</dt>
//               <dd className="summary__count-all">2</dd>
//             </dl>
//             <div className="my-likes__orders">
//               <div className="ac-dropdown e-order-default my-likes__dropdown  hidden-default-icon">
//                 <select name="order" className="">
//                   <option value="published_date">신청한 강의</option>
//                   <option value="title">완료한 강의</option>
//                   {/* <option value="rating">평점순</option> */}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="columns is-multiline is-mobile courses_card_list_body">
//           <div className="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile ">
//             <div
//               className="card course course_card_item"
//               data-productid="324582"
//               fxd-data='{"courseId":324582,"regPrice":0,"isInCart":false}'
//               data-gtm-vis-recent-on-screen-8964582_476="420"
//               data-gtm-vis-first-on-screen-8964582_476="420"
//               data-gtm-vis-total-visible-time-8964582_476="100"
//               data-gtm-vis-has-fired-8964582_476="1"
//             >
//               <a className="course_card_front e_course_click" href="/course/따라하며-배우는-노드-리액트-유튜브-만들기">
//                 <div className="card-image">
//                   <figure className="image is_thumbnail">
//                     <img
//                       loading="lazy"
//                       src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
//                       data-src="https://cdn.inflearn.com/public/courses/324582/course_cover/1ead1042-97cc-41f2-bc73-a6e86ae86a4d/nodeReact.png"
//                       className="swiper-lazy"
//                       alt="course_title.png"
//                     />
//                     <div className="onload_placeholder"></div>
//                     <div className="swiper-lazy-preloader"></div>
//                   </figure>
//                   <span className="course_cnt">강의번호</span>
//                 </div>
//                 <div className="card-content">
//                   <div className="course_title">단호박 파스타 만들기 강좌</div>
//                   <div className="instructor">쿠커: John Ahn(선생님이름)</div>
//                   <div className="date">신청날짜</div>
//                   <div className="price">가격</div>
//                   <div className="difficulty">난이도</div>
//                   <div className="time">소요시간</div>
//                   <div className="view2_summary_info">
//                     <dl className="info_delivery">
//                       <dt>
//                         <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_clock2.png" alt="시간아이콘" width="29" />
//                         "강의시간"
//                       </dt>
//                       <dd>90분</dd>
//                     </dl>
//                     <dl className="info_delivery">
//                       <dt>
//                         <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_calendar.png" alt="기간아이콘" width="29" />
//                         "강의 날짜"
//                       </dt>
//                       <dd>22.06.07일 예정</dd>
//                     </dl>
//                     <div className="info_ea">
//                       <img src="https://recipe1.ezmember.co.kr/img/mobile/icon_people.png" alt="수강아이콘" width="29" style={{ paddingRight: "5px", verticalAlign: "text-bottom" }} />
//                       <b>4/6</b>
//                       "명 수강"
//                     </div>
//                   </div>
//                   <div className="rating">
//                     <div className="rating_star">
//                       <div className="star_solid" style={{ width: "98.26086956521738%" }}>
//                         {/* ... (rest of the code) ... */}
//                       </div>
//                     </div>
//                     <p className="card-content__notice"></p>
//                     <div className="tags">
//                       <span className="tag" style={{ backgroundColor: "hsl(321,63%,90%)" }}>
//                         4/6명
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClassList;
