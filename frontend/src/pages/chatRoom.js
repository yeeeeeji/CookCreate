import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// import React,{useEffect} from "react";
import * as StompJs from "@stomp/stompjs";
import InputChat from "../component/ChatRoom/InputChat";
import HeaderChat from "../component/ChatRoom/HeaderChat";
import ChatList from "../component/ChatList/ChatList";
import ShowChat from "../component/ChatRoom/ShowChat";
import "../style/chat/chatroom.css";

//뒤로가기
// import { useHistory } from "react-router-dom";

function ChatRoom() {
  const accessToken = localStorage.getItem("access_token");
  const nick = localStorage.getItem("nickname");
  const id = localStorage.getItem("id");
  // console.log("챗페이지", typeof lessonId);

  //채팅받기
  const [chatinfo, setChatInfo] = useState([]);
  const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
  const { lessonId } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다.

  const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    onConnect: () => {
      console.log("웹소켓 연결");
      subscribe();

      // 채팅방 입장 로직
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
    },
  });

  client.activate();

  //채팅방구독
  const subscribe = () => {
    client.current.subscribe("/sub/room/" + lessonId, (chatinfo) => {
      const body = JSON.parse(chatinfo);
      setChatList((chat_list) => [...chat_list, body]);
    });
  };

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

      axios
        .get(`/api/v1/chat/1`, {
          headers: {
            Access_Token: accessToken,
          },
        })
        .then((res) => {
          console.log("채팅내용조회", res.data);
          setChatInfo(res.data);
          console.log("채팅조회", chatinfo);
        })
        .catch((err) => {
          console.log("채팅내용 조회못함", err);
        });
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
        <ShowChat lessonId={lessonId} />
      </div>
      <div className="InputChatContainer">
        <InputChat sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
