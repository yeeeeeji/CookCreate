import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

// import React,{useEffect} from "react";
import * as StompJs from "@stomp/stompjs";
import InputChat from "../component/ChatRoom/InputChat";
import HeaderChat from "../component/ChatRoom/HeaderChat";
import ChatList from "../component/ChatList/ChatList";
import ShowChat from "../component/ChatRoom/ShowChat";
import "../style/chat/chatroom.css";



function ChatRoom() {
  const accessToken = localStorage.getItem("access_token");
  const nick = localStorage.getItem("nickname");
  const id = localStorage.getItem("id");


  //채팅받기
  const [chatinfo, setChatInfo] = useState([]);
  const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
  const [messageList, setMessageList] = useState([])
  const { lessonId } = useParams(); 


  const subscribe = (client) => {
    client.current.subscribe("/sub/room/" + lessonId, (message) => {
      console.log(message)
      const json_body = JSON.parse(message.body);
      setMessageList((chatList) => [...chatList, json_body]);
    });
  }

    const client = new StompJs.Client({
      brokerURL: `ws://localhost:8080/api/v1/message`,
      onConnect: () => {
        console.log("웹소켓 연결");

        const destination = "/pub/chat/enter";
        const data = {
          lessonId: lessonId,
          userId: id,
          nickname: nick,
        };

        const body = JSON.stringify(data);
        console.log("채팅입장", body);

        client.publish({ destination, body });
        console.log("enter!");

        //입장시 채팅내용조회
        axios
          .get(`/api/v1/chat/${lessonId}`, {
            headers: {
              Access_Token: accessToken,
            },
          })
          .then((res) => {
            console.log("채팅내용", res.data);
            setMessageList(res.data);
            console.log("채팅", messageList);
          })
          .catch((err) => {
            console.log("채팅내용 조회못함", err);
          });

        subscribe(client);
      },
    });

    client.activate();

 

  const sendMessage = (messages) => {
    if (client.connected) {
      const destination = "/pub/chat/message";
      const data = {
        lessonId: lessonId,
        userId: id,
        nickname: nick,
        content: messages,
      };
      const body = JSON.stringify(data);
      console.log("채팅내용", body);

      client.publish({ destination, body });
      console.log("chat!");

    }
  };


  // const handleExit = () => {
  //   // axios
  //   // .put(`api/v1/chat/${lessonId}`, {
  //   //   headers: {
  //   //     Access_Token: accessToken,
  //   //   },
  //   // })
  //   // .then((res) => {
  //   //   console.log("채팅나가기",res.data);
  //   // })
  //   // .catch((err) => {
  //   //   console.log("채팅나가기못함",err);
  //   // });

  //   if (client) {
  //     client.deactivate();
  //     console.log("웹소켓연결해제")
  //   }
  //   // history.push("/chatlist");
  // };


  return (
    <div className="ChatRoomContainer">
      <HeaderChat lessonId={lessonId} />
      <div className="ChatListContainer">
        <ChatList />
      </div>
      <div className="ChatSpace">
        <ShowChat messageList={messageList} />
      </div>
      <div className="InputChatContainer">
        <InputChat sendMessage={sendMessage} />
      </div>
    </div>


  );
}

export default ChatRoom;

