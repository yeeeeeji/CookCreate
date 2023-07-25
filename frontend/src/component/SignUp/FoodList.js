import React from 'react';
import { useSelector } from 'react-redux';
import '../../style/foodlist.css';

function FoodList({ selectedFood, toggleFood }) {
  const role = useSelector((state) => state.auth.userType);

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
          className={`category ${selectedFood.includes('양식') ? 'selected' : ''}`}
          onClick={() => toggleFood('양식')}
        >
          양식
        </div>

        <div
          className={`category ${selectedFood.includes('이탈리안') ? 'selected' : ''}`}
          onClick={() => toggleFood('이탈리안')}
        >
          이탈리안
        </div>
        <div
          className={`category ${selectedFood.includes('비건') ? 'selected' : ''}`}
          onClick={() => toggleFood('비건')}
        >
          비건
        </div>
        <div
          className={`category ${selectedFood.includes('건강식') ? 'selected' : ''}`}
          onClick={() => toggleFood('건강식')}
        >
          건강식
        </div>
        <div
          className={`category ${selectedFood.includes('스페인') ? 'selected' : ''}`}
          onClick={() => toggleFood('스페인')}
        >
          스페인
        </div>
        <div
          className={`category ${selectedFood.includes('1인분요리') ? 'selected' : ''}`}
          onClick={() => toggleFood('1인분요리')}
        >
          1인분 요리
        </div>
        <div
          className={`category ${selectedFood.includes('일식') ? 'selected' : ''}`}
          onClick={() => toggleFood('일식')}
        >
          일식
        </div>
        <div
          className={`category ${selectedFood.includes('중식') ? 'selected' : ''}`}
          onClick={() => toggleFood('중식')}
        >
          중식
        </div>
        <div
          className={`category ${selectedFood.includes('분식') ? 'selected' : ''}`}
          onClick={() => toggleFood('분식')}
        >
          분식
        </div>
        <div
          className={`category ${selectedFood.includes('한식') ? 'selected' : ''}`}
          onClick={() => toggleFood('한식')}
        >
          한식
        </div>
        <div
          className={`category ${selectedFood.includes('아시안') ? 'selected' : ''}`}
          onClick={() => toggleFood('아시안')}
        >
          아시안
        </div>
        <div
          className={`category ${selectedFood.includes('한그릇요리') ? 'selected' : ''}`}
          onClick={() => toggleFood('한그릇요리')}
        >
          한 그릇 요리
        </div>
        <div
          className={`category ${selectedFood.includes('주류') ? 'selected' : ''}`}
          onClick={() => toggleFood('주류')}
        >
          주류
        </div>
        <div
          className={`category ${selectedFood.includes('베이킹') ? 'selected' : ''}`}
          onClick={() => toggleFood('베이킹')}
        >
          베이킹
        </div>
        <div
          className={`category ${selectedFood.includes('프랑스') ? 'selected' : ''}`}
          onClick={() => toggleFood('프랑스')}
        >
          프랑스
        </div>
        <div
          className={`category ${selectedFood.includes('멕시코') ? 'selected' : ''}`}
          onClick={() => toggleFood('멕시코')}
        >
          멕시코
        </div>
        {/* 나머지 요리 카테고리들도 위와 같은 방식으로 추가 */}
      </div>
    </div>
  );
}

export default FoodList;
