// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


// function ChatList() {
//   const [Lessons, setLessons] = useState("");
//   const dispatch = useDispatch();
//   const chatList = useSelector((state) => state.chat.chatList); 


//     return (
//       <div>
//         <h2>수업 목록</h2>
//         <ul>
//           {lessons.map((lesson) => (
//             <li key={lesson.lessonId}>
//               <span>{lesson.lessonId}</span> : <span>{lesson.lastChat}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
// }

// export default ChatList;


import React from 'react';

const dummyChatRooms = [
  { id: 1, name: 'Chat Room 1', lastMessage: 'Hello!', unreadMessages: 2 },
  { id: 2, name: 'Chat Room 2', lastMessage: 'Hi there!', unreadMessages: 0 },
  { id: 3, name: 'Chat Room 3', lastMessage: 'Welcome!', unreadMessages: 5 },
  // Add more dummy chat rooms here...
];

const ChatList = () => {
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