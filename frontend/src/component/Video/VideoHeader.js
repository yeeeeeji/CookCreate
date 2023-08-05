import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function VideoHeader() {
  const lessonTitle = useSelector((state) => state.videoLessonInfo.lessonTitle)
  const cookyerName = useSelector((state) => state.videoLessonInfo.cookyerName)

  return (
    <div>
      <div>
        {lessonTitle ? (
          <p>{lessonTitle}</p>
        ) : (
          <p>수업 제목</p>
        )}
        {cookyerName ? (
          <p>{cookyerName}</p>
        ) : (
          <p>쿠커 이름</p>
        )}
      </div>
      <div>
        <div>
          <p>진행시간</p>
          <p>0:30:47</p>
        </div>
        <div>
          <p>진행률</p>
          <p>90%</p>
        </div>
      </div>
    </div>
  );
}

export default VideoHeader;