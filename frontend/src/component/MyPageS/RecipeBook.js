import React from "react";
import '../../style/recipebook.css'
import SideBar from "./SideBar";
// import axios from "axios";
// import { useSelector } from "react-redux";

function RecipeBook() {
  // const accessToken = useSelector((state) => state.auth.token);
  // console.log(accessToken);

  // axios
  //   .get(`api/v1/my/recipe`, {
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
    <div className="recipe_container">
      <SideBar />
      <h1>레시피북</h1>
      <ul className="recipe_select">
        <ul className="recipe_select_order">
          <select name="order" className="order">
            <option value="published_date">최신순</option>
            <option value="title">오래된순</option>
            <option value="rating">평점순</option>
          </select>
        </ul>
      </ul>
      <div className="recipe_content">
        <div className="recipe_view">
          <div className="recipe_crop">
            <a  href="dd" className="recipe_thumb">
              <img src="https://recipe1.ezmember.co.kr/cache/cls/2021/04/21/0bab89e16289f7e7cdf1d2fee688db0d.jpg" alt="레시피 미리보기 사진"></img>
            </a>
          </div>
          <div className="recipe_down">
            <a  href="dd" className="recipe_logo">
              <image src="https://recipe1.ezmember.co.kr/cache/rpf/2016/01/29/900013400086b533aef0411aeb3ee7d71.png" alt="로고사진"></image>
            </a>
            <span>Download</span>
          </div>
          <ul>
            <div className="recipe">
              {/* <a href="" className="recipe"> */}
              <span className="recipe">{/* <img src="https://recipe1.ezmember.co.kr/img/icon_vod.png"> */}</span>
              {/* <img src="https://recipe1.ezmember.co.kr/cache/recipe/2019/08/21/f51404dc513ccc76be4b5668f5dd350b1_m.jpg" /> */}
              {/* </a> */}
            </div>
            <div>
              <div>과외 이름</div>
            </div>
            <div>
              <div>선생님이름, 선생님아이디</div>
            </div>
            <div>
              <div>진행단계 ... ....</div>
            </div>
            <div>
              <div>과외 날짜</div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeBook;
