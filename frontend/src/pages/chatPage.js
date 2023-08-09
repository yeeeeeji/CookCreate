// import React from "react";
// import axios from "axios";
// import ChatList from "../component/ChatList/ChatList";

// function chatPage() {
//   const lessonId = 1
//   const accessToken = localStorage.getItem('access_token')


//   //채팅내용  
//   axios
//     .get(`api/v1/chat/${lessonId}`, {
//       headers: {
//         Access_Token: accessToken,
//       },
//     })
//     .then((res) => {
//       console.log("채팅내용",res.data);
//     })
//     .catch((err) => {
//       console.log("채팅내용 조회못함");
//     });

  
  
//   return (
//     <div>
//       <ChatList />
//       채팅
//     </div>
//   );
// }

// export default chatPage;
import React, { useEffect } from "react";
import axios from "axios";
import ChatList from "../component/ChatList/ChatList";

function ChatPage() {
  const lessonId = 1;
  const accessToken = localStorage.getItem('access_token');

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
  }, []); // 빈 배열을 넣어 처음 컴포넌트가 마운트될 때만 실행

  return (
    <div>
      <ChatList />
      채팅
    </div>
  );
}

export default ChatPage;




