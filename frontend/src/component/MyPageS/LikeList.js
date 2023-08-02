import React from "react";
import SideBar from "./SideBar";


function LikeList() {
  return (
    <div className="mypage">
      <SideBar />
      <div className="view_step">
        <div className="best_tit">
          <b>좋아요한 강의</b>
        </div>
        <div className="like_list">
          <ul className="like_list">
            <div className="">
              {/* <div className="like_emoji">❤️</div> */}
              <a href="ff" className="image">
                {/* <p>이미지넣기</p> */}
                <img src="https://recipe1.ezmember.co.kr/cache/cls/2021/04/21/0bab89e16289f7e7cdf1d2fee688db0d.jpg" alt="레시피 미리보기 사진"></img>
              </a>
            </div>
            <div className="">
              <div className="like_class_category">카테고리번호,이름</div>
              <div className="like_class_title">수업명 </div>
              <div className="like_class_title">가격 </div>
              <div className="like_class_tutor">강사이름/아이디</div>
              <div className="like_detail_info">
                <div className="like_detail">
                  <b className="like_class_date">과외 날짜</b>
                  <b className="like_class_people">남은인원수/최대인원</b>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LikeList;





