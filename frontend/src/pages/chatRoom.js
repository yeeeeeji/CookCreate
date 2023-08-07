// import React from "react";
import React, { useEffect, useRef } from "react";
import InputChat from "../component/Chat/ChatRoom/InputChat";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

function ChatPage() {
  const stompClient = useRef(null); // stompClient 레퍼런스 생성

  useEffect(() => {
    const socket = new SockJS("ws://localhost:8080/api/v1/message");
    stompClient.current = StompJs.over(socket); // stompClient에 할당

    // stompClient를 활용한 추가 로직 구현

    // 컴포넌트 언마운트 시 stompClient 해제 로직 필요
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <InputChat />
    </div>
  );
}

export default ChatPage;



// import React, { useEffect } from "react";
// import InputChat from "../component/Chat/ChatRoom/InputChat";
// import * as StompJs from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// function ChatPage() {
//   useEffect(() => {
//     const client = new StompJs.Client({
//       brokerURL: "ws://localhost:8080/api/v1/message", // Stomp 서버 주소
//       webSocketFactory: () => new SockJS("ws://localhost:8080"), // SockJS 주소 수정
//       onConnect: () => {
//         console.log("Connected to Stomp server");
//       },
//     });

//     client.activate();
//   }, []);

//   return (
//     <div>
//       <InputChat />
//     </div>
//   );
// }

// export default ChatPage;

