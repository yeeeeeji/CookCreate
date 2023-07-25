import React, { useEffect } from 'react';
import NavBar from './component/Header/NavBar';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import MainPage from './pages/mainPage';
import Footer from './component/Footer/Footer';
import TotalLessons from './pages/totalLessons';
import SignUpBefore from './pages/signUpBefore';
import LessonsRanking from './pages/lessonRanking'
import RegisterLesson from './pages/registerLesson'
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/auth'
// import { loginAction, logoutAction } from '../../actions/actions_auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedNickname = localStorage.getItem('nickname');
    if (storedToken) {
      dispatch(login(storedToken, storedNickname));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);


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
