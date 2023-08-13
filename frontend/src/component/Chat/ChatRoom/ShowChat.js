import React,{useState,useEffect} from "react";
import axios from "axios";
import { MyChat, FriendChat } from "./ChatBlock";
// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

const ShowChat = () => {
  const accessToken = localStorage.getItem('access_token');
  const [messageList, setMessageList] = useState([]);
  const my_user_id = localStorage.getItem('id'); 

  const lessonId = 8;

  useEffect(() => {
    axios
      .get(`api/v1/chat/${lessonId}`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log("채팅내용", res.data);
        setMessageList(res.data);
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
        {messageList.map((chat, index) => (
          chat.userId !== my_user_id ? (
            <FriendChat key={index} message={chat.content} />
          ) : (
            <MyChat key={index} message={chat.content} />
          )
        ))}
      </div>
    </div>
  );
};

export default ShowChat;
