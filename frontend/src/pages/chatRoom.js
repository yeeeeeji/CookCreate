// import axios from "axios";
import React from "react";
// import React,{useEffect} from "react";
import * as StompJs from "@stomp/stompjs";
import InputChat from "../component/Chat/ChatRoom/InputChat";
import HeaderChat from "../component/Chat/ChatRoom/HeaderChat"
import ChatList from "../component/Chat/ChatList/ChatList";
import ShowChat from "../component/Chat/ChatRoom/ShowChat";


function ChatPage() {
  // const accessToken = localStorage.getItem('access_token')
  const nick = localStorage.getItem('nickname')
  const id = localStorage.getItem('id')


  const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    onConnect: () => {
      console.log("웹소켓 연결");
    },
  });

  client.activate();

  const sendMessage = (message) => {
    if (client.connected) {
      const destination = "/pub/chat/message";
      // const headers = { accessToken };
      const data = {
        lessonId: 8,
        // userId: "user33",
        // nickname: "sdfsa",
        userId: id,
        nickname: nick,
        content: message,
      };
      const body = JSON.stringify(data);

      client.publish({ destination, body }).catch((error) => {
        console.error("Error sending message:", error);
      });
      console.log("chat!");
    }
  };

  return (
    
    <div className="ChatRoomContainer">
        <HeaderChat />
      <div className="ChatListContainer">
        <ChatList />
      </div>
      <div className="ChatSpace">
        <ShowChat />
      </div>
      <div className="InputChatContainer">
        <InputChat sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
