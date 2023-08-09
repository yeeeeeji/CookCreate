import React from "react";
// import axios from "axios";
// import React, { useEffect } from "react";
import ChatList from "../component/Chat/ChatList/ChatList";
import * as StompJs from "@stomp/stompjs";


function chatList() {
  // const accessToken = localStorage.getItem('access_token')
  

  // useEffect(() => {
  //   axios
  //     .get(`api/v1/member`, {
  //       headers: {
  //         Access_Token: accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("채팅목록 조회못함");
  //     });
  // }, [accessToken]);



  const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    onConnect: () => {
      console.log("웹소켓 연결");
    },
  });

  client.activate();

  return (
    <div>
      <ChatList />
      채팅
    </div>
  );
}

export default chatList;
