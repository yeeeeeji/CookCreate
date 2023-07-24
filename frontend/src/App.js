import React from 'react';
import NavBar from './component/Header/NavBar';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import MainPage from './pages/mainPage';
import Footer from './component/Footer/Footer';
import TotalLessons from './pages/totalLessons';
import SignUpBefore from './pages/signUpBefore';
import LessonsRanking from './pages/lessonRanking'  
import { Route, Routes } from 'react-router-dom';

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
      </Routes>
      <br />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
