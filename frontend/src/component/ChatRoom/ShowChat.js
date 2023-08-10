import React, { useState, useEffect } from "react";
import axios from "axios";
import { MyChat, FriendChat } from "./ChatBlock";
// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

const ShowChat = ({ lessonId }) => {
  // console.log("showchat레슨아이디",typeof(lessonId))
  // const LessonId = parseInt(lessonId)
  // console.log("showchat레슨아이디",typeof(LessonId))
  const accessToken = localStorage.getItem("access_token");
  console.log("토큰", accessToken);
  const [messageList, setMessageList] = useState([]);
  const my_user_id = localStorage.getItem("id");

  useEffect(() => {
    console.log("채팅내용조회", typeof lessonId);
    console.log("채팅내용조회", lessonId);
    // 채팅내용 조회를 useEffect 내부로 이동
    axios
      .get(`/api/v1/chat/${lessonId}`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log("채팅내용2", res.data);
        setMessageList(res.data);
        console.log("채팅2", messageList);
      })
      .catch((err) => {
        console.log("채팅내용 조회못함", err);
      });
  }, []);

  // const messageList = useSelector((state) => state.chat.MessageList);
  // const chatDivRef = useRef();

  // const my_user_id = "";

  // const scrollToBottom = () => {
  //   chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messageList]);

  return (
    <div>
      <div style={{ overflowY: "auto", height: "300px" }}>
        {messageList.map((chat, index) =>
          // 메시지를 보낸 사용자에 따라 다른 컴포넌트를 렌더링
          chat.userId !== my_user_id ? <FriendChat key={index} message={chat.content} /> : <MyChat key={index} message={chat.content} />
        )}
      </div>
    </div>
  );
};

export default ShowChat;
