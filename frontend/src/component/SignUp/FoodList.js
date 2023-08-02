import React from 'react';
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
          className={`category ${selectedFood.includes(0) ? 'selected' : ''}`}
          onClick={() => toggleFood(0, 'korean')}
        >
          한식
        </div>

        <div
          className={`category ${selectedFood.includes(1) ? 'selected' : ''}`}
          onClick={() => toggleFood(1, 'western')}
        >
          양식
        </div>

        <div
          className={`category ${selectedFood.includes(2) ? 'selected' : ''}`}
          onClick={() => toggleFood(2, 'chinese')}
        >
          중식
        </div>

        <div
          className={`category ${selectedFood.includes(3) ? 'selected' : ''}`}
          onClick={() => toggleFood(3, 'japanese')}
        >
          일식
        </div>

        <div
          className={`category ${selectedFood.includes(4) ? 'selected' : ''}`}
          onClick={() => toggleFood(4, 'asian')}
        >
          아시안
        </div>

        <div
          className={`category ${selectedFood.includes(5) ? 'selected' : ''}`}
          onClick={() => toggleFood(5, 'healthy')}
        >
          건강식
        </div>

        <div
          className={`category ${selectedFood.includes(6) ? 'selected' : ''}`}
          onClick={() => toggleFood(6, 'dessert')}
        >
          디저트
        </div>
      </div>
    </div>
  );
}

export default FoodList;
