import React from "react";
// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { MyChat, FriendChat } from "./ChatBlock";

const ChatWindow = () => {
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
      {/* <div ref={chatDivRef} style={{ overflowY: "auto", height: "300px" }}>
        {messageList.map((message, index) => (
          메시지를 보낸 사용자에 따라 다른 컴포넌트를 렌더링
          {message.user_id !== my_user_id ? (
            <FriendChat key={index} message={message} />
          ) : (
            <MyChat key={index} message={message} />
          )}
        ))}
      </div> */}
    </div>
  );
};

export default ChatWindow;
