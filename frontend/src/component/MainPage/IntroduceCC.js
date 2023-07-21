import React, {useState} from 'react';

function IntroduceCC() {
  const [chooseUserType, setUserType] = useState('cookyer')

  const handleCookyerButtonClick = () => {
    setUserType('cookyer');
  };
  const handleCookieeButtonClick = () => {
    setUserType('cookiee');
  };


  return (
    <div>
            <div> 
        <div className='chooseType'>
          <button onClick={handleCookyerButtonClick}>Cookyer 쿠커</button> |
          <button onClick={handleCookieeButtonClick}>Cookiee 쿠키</button>
        </div>
        <div className='introduceType'>
          <div className='typeName'>
            {chooseUserType === 'cookyer' ? <div>쿠커</div> : <div>쿠키</div>}
          </div>
          <div className='typeStep'>
            {chooseUserType === 'cookyer' ? 
            <div>
              <div>
                등록: 강의를 올린다
              </div>
              <div>
                모집: 수강생을 모집한다
              </div>
              <div>
                요리: 수업한다 당신의 지식을 나눠주세요~
              </div>
            </div> :
             <div>
              <div>
                검색: 검색하세요! 카테고리, 선생님 아무 키워드나 괜찮습니다.
              </div>
              <div>
                신청: 신청하세요! 선생님이 확인 후 답변을 빠르게 드립니다.
              </div>
              <div>
                요리: 같이 요리하세요! (굿)
              </div>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroduceCC;