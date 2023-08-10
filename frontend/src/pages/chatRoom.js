import React, { useState } from "react";
import ChatList from "../component/ChatList/ChatList";
import ShowChat from "../component/ChatRoom/ShowChat";
import "../style/chat/chatroom.css";

function ChatRoom() {
  //채팅받기
  // const [chatinfo, setChatInfo] = useState([]);
  // const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
  // const { lessonId } = useParams(); 
  
  const [chatTitle, setChatTitle] = useState()
  const [lessonId, setLessonId] = useState(null)

  const goChatRoom = ({lessonId, chatTitle}) => {
    setLessonId(lessonId)
    setChatTitle(chatTitle)
  }

  return (
    <div className="chatroom-container">
      <div className="ChatListContainer">
        <ChatList goChatRoom={goChatRoom} />
      </div>
      <div className="chat-room-content">
        {lessonId === null ? (
          <p>채팅방을 선택해주세요.</p>
        ) : (
          <div className="ChatSpace">
            <ShowChat lessonId={lessonId} chatTitle={chatTitle}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRoom;

