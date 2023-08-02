import React, { useEffect } from "react";
import "../../style/foodlist.css";

function FoodList({ selectedFood, toggleFood }) {
  const role = localStorage.getItem("userType");
  useEffect(() => {
    console.log("FoodList", selectedFood);
  }, [selectedFood]);

  return (
    <div>
      <div>
        {role === "COOKYER" ? <div>자신 있는 요리 (선택)</div> : null}

        {role === "COOKIEE" ? <div>관심 있는 요리 (선택)</div> : null}
      </div>

      <div className="foodList">
        <div className={`category ${selectedFood && selectedFood.includes("korean") ? "selected" : ""}`} onClick={() => toggleFood("korean")}>
          한식
        </div>

        <div className={`category ${selectedFood && selectedFood.includes("western") ? "selected" : ""}`} onClick={() => toggleFood("western")}>
          양식
        </div>
        <div className={`category ${selectedFood && selectedFood.includes("chinese") ? "selected" : ""}`} onClick={() => toggleFood("chinese")}>
          중식
        </div>
        <div className={`category ${selectedFood && selectedFood.includes("japanese") ? "selected" : ""}`} onClick={() => toggleFood("japanese")}>
          일식
        </div>
        <div className={`category ${selectedFood && selectedFood.includes("asian") ? "selected" : ""}`} onClick={() => toggleFood("asian")}>
          아시안
        </div>
        <div className={`category ${selectedFood && selectedFood.includes("healthy") ? "selected" : ""}`} onClick={() => toggleFood("healthy")}>
          건강식
        </div>
        <div className={`category ${selectedFood && selectedFood.includes("dessert") ? "selected" : ""}`} onClick={() => toggleFood("dessert")}>
          디저트
        </div>
      </div>
    </div>
  );
}

export default FoodList;
