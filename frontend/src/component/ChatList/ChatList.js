import React, { useEffect, useState } from "react";
import axios from "axios";



const ChatList = (props) => {
  console.log("props", props);
  const accessToken = localStorage.getItem("access_token");
  const [chatlist, setChatList] = useState([]);

  useEffect(() => {
    console.log(chatlist);
    axios
      .get(`/api/v1/chat`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log("채팅목록", res.data);
        setChatList(res.data);
      })
      .catch((err) => {
        console.log("채팅목록 조회못함", err);
      });
  }, []);

  // const formatTime = (dateTimeString) => {
  //   const dateObject = new Date(dateTimeString);
  //   const formattedTime = dateObject.toISOString().slice(0, 16);
  //   return formattedTime;
  // };

  const handleChatRoom = ({ chatTitle, lessonId, chatOver }) => {
    console.log(chatTitle, lessonId, chatOver);
    props.goChatRoom({ chatTitle, lessonId, chatOver });
  };

  return (
    <div>
      <h3>참여중인 채팅방</h3>
      <div> 
        {chatlist.map((chatRoom) => (
          <div key={chatRoom.lessonId}>
            {chatRoom.chatRoomOver === false && (
              <>
                <div onClick={() => handleChatRoom({ lessonId: chatRoom.lessonId, chatTitle: chatRoom.lessonTitle, chatOver: chatRoom.chatRoomOver })}>
                  {/* <Link to={`/chatroom`}> */}
                  {chatRoom.lessonTitle ? (
                    <strong>{chatRoom.lessonTitle}</strong>
                  ) : (
                    <p>참여중인 채팅방이 없습니다.</p>
                  )}
                  {chatRoom.leastContent !== null ? (
                    <div>
                      <p>{chatRoom.leastContent.length > 10 ? chatRoom.leastContent.slice(0, 7) + ".." : chatRoom.leastContent}</p>
                      {/* <span>{formatTime(chatRoom.lestCreateTime)}</span> */}
                      <span style={{ fontSize: '10px' }}  >{new Date(chatRoom.lestCreateTime).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit' })}</span>  
                    </div>
                    ) : (
                      <p>""</p>
                    )}
                </div>
              </>
            )}
            {chatRoom.chatRoomOver === true && (
              <>
                <h3>완료된 채팅방</h3>
                <div onClick={() => handleChatRoom({ lessonId: chatRoom.lessonId, chatTitle: chatRoom.leastContent, chatOver: chatRoom.chatRoomOver })}>
                  {/* <Link to={`/chatroom`}> */}
                  <strong>{chatRoom.lessonTitle}</strong>
                  {/* <h2>{chatRoom.lessonTitle}</h2> */}
                  {/* <p>마지막 메세지: {chatRoom.leastContent}</p> */}
                  <p>{chatRoom.leastContent.length > 10 ? chatRoom.leastContent.slice(0, 7) + ".." : chatRoom.leastContent}</p>
                  {/* <span>종료 시간: {formatTime(chatRoom.lestCreateTime)}</span> */}
                  <span style={{ fontSize: '10px' }} >{new Date(chatRoom.lestCreateTime).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit' })}</span>  
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
