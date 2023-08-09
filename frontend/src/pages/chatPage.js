import React from "react";
import axios from "axios";
import ChatList from "../component/Chat/ChatList/ChatList";

function chatPage() {
  const lessonId = 8
  const accessToken = localStorage.getItem('access_token')


  //채팅내용  
  axios
    .get(`api/v1/chat/${lessonId}`, {
      headers: {
        Access_Token: accessToken,
      },
    })
    .then((res) => {
      console.log("채팅내용",res.data);
    })
    .catch((err) => {
      console.log("채팅내용 조회못함");
    });

  
  
  return (
    <div>
      <ChatList />
      채팅
    </div>
  );
}

export default chatPage;



