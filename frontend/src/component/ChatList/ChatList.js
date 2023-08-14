import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ChatListContainer = styled.div`
  // flex: 1;
  // padding: 20px;
  // background-color: #ffffff;
  // border-right: 1px solid #ccc;
  // overflow-y: auto;
  // margin-right: 1px;

  flex: none;
  height: 582px; 
  width: 200px;
  padding: 20px;
  background-color: rgb(255 239 221);
  // border-right: 2px solid #ccc;
  overflow-y: auto;
  margin-right: 1px;
`;

const StyledChatH3 = styled.h3`
  font-size: 17px;
  color: rgb(87, 49, 14);
  text-align: center; 
`;

const StyledChatH2 = styled.h2`
  font-size: 15px;
  color: rgb(87, 49, 14);
  text-align: center; 
`;



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
      <ChatListContainer>
        {/* <h3 className="ChatH3" style={{ fontSize: 17, color: 'rgb(87, 49, 14)' }}>참여중인 채팅방</h3> */}
        <StyledChatH3>참여중인 채팅방</StyledChatH3>
        <div>
          {chatlist.map((chatRoom) => (
            <div key={chatRoom.lessonId}>
              {chatRoom.chatRoomOver === false && (
                <>
                  <div style={{ marginLeft: '20px' }} onClick={() => handleChatRoom({ lessonId: chatRoom.lessonId, chatTitle: chatRoom.lessonTitle, chatOver: chatRoom.chatRoomOver })}>
                    {/* <Link to={`/chatroom`}> */}
                    {chatRoom.lessonTitle ? <strong style={{ color: 'rgb(92, 82, 73)' }} >{chatRoom.lessonTitle}</strong> : <p>참여중인 채팅방이 없습니다.</p>}
                    {chatRoom.leastContent !== null ? (
                      <div>
                        <p style={{ color:'rgb(92 82 73)'}} >{chatRoom.leastContent.length > 10 ? chatRoom.leastContent.slice(0, 7) + ".." : chatRoom.leastContent}</p>
                        {/* <span>{formatTime(chatRoom.lestCreateTime)}</span> */}
                        <span style={{ fontSize: "10px", color:'rgb(92 82 73)' }}>
                          {new Date(chatRoom.lestCreateTime).toLocaleDateString("ko-KR", {
                            month: "2-digit",
                            day: "2-digit",
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </>
              )}
              {chatRoom.chatRoomOver === true && (
                <>
                  {/* <h3 className="ChatH3" style={{ fontSize: 15, color: 'rgb(87, 49, 14)' }} >종료된 채팅방</h3> */}
                  <h3 className="ChatH3" style={{ fontSize: 17, color: 'rgb(87, 49, 14)',textAlign:'center' }} >종료된 채팅방</h3>
                  <div  style={{ marginLeft: '20px' }} onClick={() => handleChatRoom({ lessonId: chatRoom.lessonId, chatTitle: chatRoom.leastContent, chatOver: chatRoom.chatRoomOver })}>
                    {/* <Link to={`/chatroom`}> */}
                    <strong style={{ color: 'rgb(92, 82, 73)' }} >{chatRoom.lessonTitle}</strong>
                    {/* <h2>{chatRoom.lessonTitle}</h2> */}
                    {/* <p>마지막 메세지: {chatRoom.leastContent}</p> */}
                    <p style={{ color:'rgb(92 82 73)' }}>{chatRoom.leastContent.length > 10 ? chatRoom.leastContent.slice(0, 10) + "..." : chatRoom.leastContent}</p>
                    {/* <span>종료 시간: {formatTime(chatRoom.lestCreateTime)}</span> */}
                    <span style={{ fontSize: "10px",color:'rgb(92 82 73)' }}>
                      {new Date(chatRoom.lestCreateTime).toLocaleDateString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ChatListContainer>
    </div>
  );
};

export default ChatList;
