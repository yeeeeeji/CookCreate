// import React, { Component } from "react";
// import InputChat from "../component/Chat/ChatRoom/InputChat";
// import SockJsClient from "react-stomp";

// class ChatPage extends Component {
//   constructor(props) {
//     super(props);

//     this.clientRef = null;
//   }

//   handleSocketConnect = () => {
//     console.log("WebSocket connected");
//   }

//   handleSocketDisconnect = () => {
//     console.log("WebSocket disconnected");
//   }

//   // handleSocketMessage = (msg) => {
//   //   console.log("Received message:", msg);
//   // }

//   render() {
//     return (
//       <div>
//         <InputChat />
//         <SockJsClient
//           url='http://localhost:8080/api/v1/message'
//           topics={['/topics/all']}
//           onConnect={this.handleSocketConnect}
//           onDisconnect={this.handleSocketDisconnect}
//           // onMessage={this.handleSocketMessage}
//           ref={(client) => { this.clientRef = client; }}
//         />
//       </div>
//     );
//   }
// }

// export default ChatPage;


// import React, { useEffect } from "react";
// import React from "react";
// import InputChat from "../component/Chat/ChatRoom/InputChat";
// import SockJsClient from "react-stomp";

// function ChatPage() {
//   const handleSocketConnect = () => {
//     console.log("WebSocket connected");
//   };

//   const handleSocketDisconnect = () => {
//     console.log("WebSocket disconnected");
//   };

//   const handleSocketMessage = (msg) => {
//     console.log("Received message:", msg);
//   };

//   return (
//     <div>
//       <InputChat />
//       <SockJsClient
//         url="http//localhost:8080/api/v1/message/ws"
//         topics={["/topics/all"]}
//         onConnect={handleSocketConnect}
//         onDisconnect={handleSocketDisconnect}
//         onMessage={handleSocketMessage}
//       />
//     </div>
//   );
// }

// export default ChatPage;




// import React, { useEffect } from "react";
// import InputChat from "../component/Chat/ChatRoom/InputChat";
// import * as SockJS from 'sockjs-client';

// function ChatPage() {
//   useEffect(() => {
//     const client = new SockJS('http://localhost:8080/api/v1/message/ws', null, {
//       transports: ['websocket'],
//     });

//     client.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     // client.onmessage = (e) => {
//     //   console.log("Received message:", e.data);
//     // };

//     client.onclose = () => {
//       console.log("WebSocket disconnected");
//     };

//     return () => {
//       client.close();
//     };
//   }, []);

//   return (
//     <div>
//       <InputChat />
//     </div>
//   );
// }

// export default ChatPage;


import React from "react";
import * as StompJs from '@stomp/stompjs';


function ChatPage() {

    const client = new StompJS.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    // webSocketFactory: () => {
    //   return new SockJS("localhost:8080");
    // }
  });

  client.activate();

  return (
    <div>
      
    </div>
  );
}

export default ChatPage;



