import React from 'react';
// import StompJS from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import React,{useRef} from 'react';
// import * as StompJs from '@stomp/stompjs';



const dummyChatRooms = [
  { id: 1, name: 'Chat Room 1', lastMessage: 'Hello!', unreadMessages: 2 },
  { id: 2, name: 'Chat Room 2', lastMessage: 'Hi there!', unreadMessages: 0 },
  { id: 3, name: 'Chat Room 3', lastMessage: 'Welcome!', unreadMessages: 5 },
];

const ChatList = () => {
  // const client = useRef<any>({});


  // const client = new StompJS.Client({
  //   brokerURL: `ws://localhost:8080/api/v1/message`,
  //   webSocketFactory: () => {
  //     return new SockJS("localhost:8080");
  //   }
  // });

  // client.activate();

  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     brokerURL: 'ws://localhost:8080/api/v1/message',
  //     onConnect: () => {
  //       console.log('success');
        
  //     },
  //   });
  //   client.current.activate();
  // };


  return (
    <div>
      <h2>Chat Room List</h2>
      <ul>
        {dummyChatRooms.map((chatRoom) => (
          <li key={chatRoom.id}>
            <strong>{chatRoom.name}</strong>
            <p>Last Message: {chatRoom.lastMessage}</p>
            {chatRoom.unreadMessages > 0 && (
              <span>Unread Messages: {chatRoom.unreadMessages}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
