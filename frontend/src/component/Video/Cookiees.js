import React, { useState } from 'react';
import UserVideoComponent from './UserVideoComponent';

import '../../style/video.css'

function Cookiees() {
  // const subscribers = 

  return (
    <div className='cookiees'>
      <div className='cookiee'>쿠키1</div>
      <div className='cookiee'>쿠키2</div>
      <div className='cookiee'>쿠키3</div>
      <div className='cookiee'>쿠키4</div>
      <div className='cookiee'>쿠키5</div>
      <div className='cookiee'>쿠키6</div>
      {/* 반복문 등 통해서 해결하기 */}
      {/* <UserVideoComponent/>
      <UserVideoComponent/>
      <UserVideoComponent/>
      <UserVideoComponent/>
      <UserVideoComponent/>
      <UserVideoComponent/> */}
    </div>
  );
}

export default Cookiees;