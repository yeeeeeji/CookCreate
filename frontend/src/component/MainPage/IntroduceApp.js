import React from 'react';
import '../../style/mainpage/introduceApp.css'

function IntroduceApp() {
  return (
    <div>
      <div className='appContent'>  
        <div className='animation-container'>
          <div className='topContent'>     
            <div className='appText'>함께 요리하고 <br/> 궁금한 점이 있으면 바로 손을 드세요! </div>   
              <div className='appTitle'>Cook Create</div>
            <div className='appText'>실시간으로 피드백을 해주는 내 옆의 선생님, 쿡크와 함께라면 문제없어요!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroduceApp;