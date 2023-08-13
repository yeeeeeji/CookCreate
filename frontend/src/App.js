import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/auth'
import CookyerScreen from './pages/video/cookyerScreen';
import CookieeScreen from './pages/video/cookieeScreen';
import AppWithLayout from './component/AppWithLayout';

function App() {

  return (
    <div>
      <Routes>
        <Route path='*' element={<AppWithLayout/>}/>
        <Route path='/videoLesson/COOKYER' element={<CookyerScreen/>}></Route>
        <Route path='/videoLesson/COOKIEE' element={<CookieeScreen/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
