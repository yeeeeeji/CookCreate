import React, { useEffect } from "react";
import axios from "axios";
import ChatList from "../component/ChatList/ChatList";

function ChatPage() {
  const lessonId = 1;
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // 채팅 내용 조회
    axios
      .get(`api/v1/chat/${lessonId}`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log("채팅내용", res.data);
      })
      .catch((err) => {
        console.log("채팅내용 조회못함");
      });
  }, []);

  return (
    <div>
      <ChatList />
      채팅
    </div>
  );
}

export default ChatPage;
