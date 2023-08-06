import React, {useState, useEffect} from "react";
import "../../style/recipebook.css";
import SideBar from "./SideBar";
import axios from "axios";
import { useSelector } from "react-redux";

function RecipeBook() {
  const accessToken = useSelector((state) => state.auth.access_token);
  console.log(accessToken);
  const [recipeBookData, setRecipeBookData] = useState([]);

  useEffect(() => {
    axios
      .get(`api/v1/my/recipe`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        setRecipeBookData(res.data);
        console.log("레시피북", recipeBookData);
      })
      .catch((err) => {
        console.log("레시피북 정보 못가져옴", err);
      });
  }, [recipeBookData]);

    return (
      <div className="recipe_container">
        <SideBar />
        <h1>레시피북</h1>
        {recipeBookData.map((recipe) => (
          <div key={recipe.lessonId}>
            <ul className="recipe_select">
              {/* <ul className="recipe_select_order">
                <select name="order" className="order">
                  <option value="published_date">최신순</option>
                  <option value="title">오래된순</option>
                  <option value="rating">평점순</option>
                </select>
              </ul> */}
            </ul>
            <div className="recipe_content">
              <div className="recipe_view">
                <div className="recipe_crop">
                  <a href="dd" className="recipe_thumb">
                    <img src="https://recipe1.ezmember.co.kr/cache/cls/2021/04/21/0bab89e16289f7e7cdf1d2fee688db0d.jpg" alt="레시피 미리보기 사진"></img>
                  </a>
                </div>
                <div className="recipe_down">
                  <a href="dd" className="recipe_logo">
                    <image src="https://recipe1.ezmember.co.kr/cache/rpf/2016/01/29/900013400086b533aef0411aeb3ee7d71.png" alt="로고사진"></image>
                  </a>
                  <button>Download</button>
                </div>
                <ul>
                  <div className="recipe">
                    {/* <a href="" className="recipe"> */}
                    {/* <span className="recipe"><img src="https://recipe1.ezmember.co.kr/cache/rpf/2016/01/29/900013400086b533aef0411aeb3ee7d71.png"></span> */}
                    {/* <img src="https://recipe1.ezmember.co.kr/cache/recipe/2019/08/21/f51404dc513ccc76be4b5668f5dd350b1_m.jpg" /> */}
                    {/* </a> */}
                  </div>
                  <div>
                    <div>강좌명:{recipe.lessonTitle}</div>
                  </div>
                  <div>
                    <div>강좌ID:{recipe.lessonId}</div>
                  </div>
                  <div>
                    <dt>카테고리</dt>
                      <dd>
                        {(() => {
                          switch (recipe.categoryId) {
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
                  <div>
                    <div>선생님아이디/닉네임:{recipe.cookyerId}/{recipe.cookyerName}</div>
                  </div>
                  <div>
                    {/* <div>진행단계</div>
                    <div>{recipe.lessonStepList}</div> */}
                  </div>
                  <div>
                    <div>과외 날짜:{recipe.lessonDate}</div>
                    {/* <div>{recipe.lessonDate}</div> */}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

export default RecipeBook;
