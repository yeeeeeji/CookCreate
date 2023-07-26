import React from 'react';
import { useSelector } from 'react-redux';
import '../../style/foodlist.css';

function FoodList({ selectedFood, toggleFood }) {
  const role = localStorage.getItem('userType')

  return (
    <div>
      <div>
        {role === 'COOKYER' ? (
          <div>
            자신 있는 요리 (선택)
          </div>
        ) : null}

        {role === 'COOKIEE' ? (
          <div>
            관심 있는 요리 (선택)
          </div>
        ) : null}
      </div>

      <div className="foodList">
        <div
          className={`category ${selectedFood.includes('korean') ? 'selected' : ''}`}
          onClick={() => toggleFood('korean')}
        >
          한식
        </div>

        <div
          className={`category ${selectedFood.includes('western') ? 'selected' : ''}`}
          onClick={() => toggleFood('western')}
        >
          양식
        </div>
        <div
          className={`category ${selectedFood.includes('chinese') ? 'selected' : ''}`}
          onClick={() => toggleFood('chinese')}
        >
          중식
        </div>
        <div
          className={`category ${selectedFood.includes('japanese') ? 'selected' : ''}`}
          onClick={() => toggleFood('japanese')}
        >
          일식
        </div>
        <div
          className={`category ${selectedFood.includes('asian') ? 'selected' : ''}`}
          onClick={() => toggleFood('asian')}
        >
          아시안
        </div>
        <div
          className={`category ${selectedFood.includes('healthy') ? 'selected' : ''}`}
          onClick={() => toggleFood('healthy')}
        >
          건강식
        </div>
        <div
          className={`category ${selectedFood.includes('dessert') ? 'selected' : ''}`}
          onClick={() => toggleFood('dessert')}
        >
          디저트
        </div>
      </div>
    </div>
  );
}

export default FoodList;
