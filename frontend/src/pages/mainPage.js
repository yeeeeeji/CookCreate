import React from 'react';
import IntroduceCC from '../component/MainPage/IntroduceCC'
import CoreFunction from '../component/MainPage/CoreFunction';
import GoToGesture from '../component/MainPage/GoToGesture';
import IntroduceApp from '../component/MainPage/IntroduceApp';
import SearchRecipe from '../component/MainPage/SearchRecipe';
function mainPage() {
  return (
    <div>
      <IntroduceApp/>
      <SearchRecipe/>
      <CoreFunction/>
      <br/>
      <IntroduceCC/>
      <br/>
      <GoToGesture/>
    </div>
  );
}

export default mainPage;