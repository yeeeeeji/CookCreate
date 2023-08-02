import React, { useEffect } from 'react';
import NavBar from './component/Header/NavBar';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import MainPage from './pages/mainPage';
import Footer from './component/Footer/Footer';
import TotalLessons from './pages/totalLessons';
import SignUpBefore from './pages/signUpBefore';
import RegisterLesson from './pages/registerLesson'
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/auth'
import LessonItem from './component/TotalLessons/LessonItem';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedRole = localStorage.getItem('role')
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    const userId = localStorage.getItem('id')
    if (access_token) {
      dispatch(login({
        'access_token' : access_token,
        'refresh_token' : refresh_token,
        'nickname' : storedNickname, 
        'role' : storedRole,
        'userId' : userId
      }));
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
        <Route path='/registerlesson' element={<RegisterLesson/>}></Route>
        <Route path='/lesson/:id' element={<LessonItem/>}></Route>
      </Routes>
      <br />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
