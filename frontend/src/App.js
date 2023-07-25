import React, {useEffect} from 'react';
import NavBar from './component/NavBar';
import SignUp from './component/SignUp';
import LogIn from './component/LogIn'
import MainPage from './component/MainPage';
import TotalLessons from './pages/totalLessons';
import SignUpBefore from './pages/signUpBefore';
import LessonsRanking from './pages/lessonRanking'
import RegisterLesson from './pages/registerLesson'

import { Link, Route, Routes, Router } from 'react-router-dom';
import Footer from './component/Footer';
function App() {
  return (
    <div>
      <NavBar />
      {/* 링크 이곳에 추가 */}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/totallessons' element={<TotalLessons />} />
        <Route path='/signupbefore' element={<SignUpBefore/>}/>
        <Route path='/lessonranking' element={<LessonsRanking/>}></Route>
        <Route path='/registerlesson' element={<RegisterLesson/>}></Route>
      </Routes>
      <br />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
