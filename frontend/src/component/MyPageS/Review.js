import React from "react";
import '../../style/review.css'
import SideBar from "./SideBar";

// import axios from "axios";
// import { useSelector } from "react-redux";


function Review() {
  // const accessToken = useSelector((state) => state.auth.token);
  // console.log(accessToken);

  // axios
  //   .get(`api/v1/my/review`, {
  //     headers: {
  //       Access_Token: accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div>
      <SideBar />
      <section>
        <div className="header">
          <h2 className="header_title">작성한 리뷰</h2>
        <h2 className="section_title">
          강좌리뷰
        </h2>
        </div>
        <ul className="caution_list">
          <div className="caution_list_item">
            <div>
            </div>
          </div>
        </ul>
        <div className="panel">
          <div className="ac-dropdown e-order-default my-likes__dropdown  hidden-default-icon">
            <select name="order" className="">
              <option value="published_date">최근 리뷰</option>
              <option value="title">오래된 순</option>
            </select>
          </div>
        </div>
        <section className="review">
          <div className="review_box">
            <div className="review_item">
              <div className="review_cont">
                <a href="dd" className="review_link">강좌이름</a>
                <div className="review_star">
                  ⭐️⭐️⭐️⭐️ 4.2
                </div>
                <div className="review_author">
                  작성자/아이디
                </div>
                <div className="review_tutor">
                  선생님닉네임/이름
                </div>
                <div className="review_cont">
                  리뷰내용
                  <div className="review_cont">
                    맛있었구요.....
                  </div>
                </div>
                <div className="review_fun">
                  <button type="button" className="review_btn">
                    <i className="review_icon">✏️</i>
                    <span className="review_btn_txt">수정</span>
                  </button>
                  <button type="button" className="review_btn">
                    <i className="review_icon">X</i>
                    <span className="review_btn_txt">삭제</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Review;
