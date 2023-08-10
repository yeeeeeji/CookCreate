// import React, { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";
import { MyChat, FriendChat } from "./ChatBlock";


const ShowChat = ({ messageList}) => {
  const accessToken = localStorage.getItem("access_token");
  console.log("토큰", accessToken);
  const my_user_id = localStorage.getItem("id");


  console.log("showchat",messageList)

  return (
    <div>
      <div style={{ overflowY: "auto", height: "300px" }}>
        {messageList.map((chat, index) =>
          chat.userId !== my_user_id ? <FriendChat key={index} message={chat.content} author={chat.userId} /> : <MyChat key={index} message={chat.content} />
        )}
      </div>
    </div>
  );
};

export default ShowChat;





