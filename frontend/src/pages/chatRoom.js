// import axios from "axios";
import React,{useState} from "react";
// import React,{useEffect} from "react";
import * as StompJs from "@stomp/stompjs";
import InputChat from "../component/ChatRoom/InputChat";
import HeaderChat from "../component/ChatRoom/HeaderChat"
import ChatList from "../component/ChatList/ChatList";
import ShowChat from "../component/ChatRoom/ShowChat";
import "../style/chat/chatroom.css"

// import { useHistory } from "react-router-dom";

// import { useParams } from 'react-router-dom';


function ChatPage() {
  const nick = localStorage.getItem('nickname');
  const id = localStorage.getItem('id');
  const [connected, setConnected] = useState(false);
  console.log("챗페이지", typeof(lessonId));

  const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    onConnect: () => {
      console.log("웹소켓 연결");
      setConnected(true);
      
      // 채팅방 입장 로직
      const destination = "/pub/chat/enter";
      const data = {
        lessonId: 1,
        userId: id,
        nickname: nick,
      };
      const body = JSON.stringify(data);
      console.log("채팅입장", body);

      client.publish({ destination, body });
      console.log("enter!");
    },
  });

  client.activate();

  const sendMessage = (messages) => {
    if (client.connected) {
      const destination = "/pub/chat/message";
      const data = {
        lessonId: 1,
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
      <HeaderChat lessonId={1} />
      <div className="ChatListContainer">
        <ChatList />
      </div>
      <div className="ChatSpace">
        <ShowChat lessonId={1} />
      </div>
      <div className="InputChatContainer">
        <InputChat sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
