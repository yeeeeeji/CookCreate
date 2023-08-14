import React, { useEffect} from 'react';
import '../../style/mainpage/coreFunction.css'

function CoreFunction() {
  useEffect(() => {
    // 페이지 전환 시 실행할 초기화 코드

    function handleScroll() {
      const elements = document.querySelectorAll('.coreWrap');
      let animated = Array.from(elements).fill(false);

      elements.forEach((element, index) => {
        // 요소가 화면 중앙에 보일 때 클래스를 추가하여 나타나게 함
        const elementTop = element.getBoundingClientRect().top;
        // const windowHeight = window.innerHeight;
        // console.log(elementTop + " " + windowHeight);
      
        if (elementTop < 450 && !animated[index]) {
          element.classList.add('visible');
          animated[index] = true;
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    // 반환된 함수는 컴포넌트가 언마운트되거나 업데이트되기 직전에 실행됨
    return () => {
      // 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  
  return (
    <div className="coreContainer">
      <div className="coreWrap">
        <div className="coreTitle">
          체크
        </div>
        <div className="coreDescription">
          체크 제스쳐를 해보세요.
          <br/>
          선생님께 내 진행 상황을 손 쉽게 알릴 수 있어요.
        </div>
      </div>
      <div className="coreWrap">
        <div className="coreTitle">
          손들기
        </div>
        <div className="coreDescription">
          직접 손을 들어보세요.
          <br />
          도움이 필요할 때 바로 선생님을 부를 수 있어요.
        </div>
      </div>
      <div className="coreWrap">
        <div className="coreTitle">
          타이머
        </div>
        <div className="coreDescription">
          요리 도중 타이머가 필요하신가요?
          <br/>
          손에 음식이 묻어있어도 바로 타이머를 맞출 수 있어요.
        </div>
      </div>
    </div>
  );
}

export default CoreFunction;