import React from "react";
import * as StompJs from '@stomp/stompjs';
// import { Client } from '@stomp/stompjs';


function ChatPage() {

    const client = new StompJs.Client({
    brokerURL: `ws://localhost:8080/api/v1/message`,
    onConnect: () => {
      console.log("웹소켓 연결");
    },
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
//         url="http://localhost:8080/api/v1/message/ws"
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
// // import * as SockJS from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';

// function ChatPage() {

//     const client = new StompJs.Client({
//       brokerURL: 'ws://localhost:8080/api/v1/message'
//       onConnect:()=> {
//         console.log("WebSocket connected");}
//     });

//     // client.webSocketFactory = () => {
//     //   return new SockJS('http://localhost:8080/api/v1'); 
//     // };

//     // client.onConnect = () => {
//     //   console.log("WebSocket connected");
//     // };

//     // client.activate();

//     // Clean up the WebSocket connection when the component unmounts
//     // return () => {
//     //   client.deactivate();
//     // };
  

//   return (
//     <div>
//       <InputChat />
//     </div>
//   );
// }

// export default ChatPage;




// import React, { useRef, useState, useEffect } from "react";
// import * as SockJS from "sockjs-client";

// function ChatPage() {
//   const [connected, setConnected] = useState(false);
//   const client = useRef(null);

//   const connect = () => {
//     if (!client.current) {
//       client.current = new SockJS("http//localhost:8080/api/v1/message/ws");
//       client.current.onopen = () => {
//         setConnected(true);
//         console.log("WebSocket connected");
//       };
//       client.current.onclose = () => {
//         setConnected(false);
//         console.log("WebSocket disconnected");
//       };
//     }
//   };

//   useEffect(() => {
//     connect();

//     return () => {
//       if (client.current) {
//         client.current.close();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       {connected ? (
//         <p>WebSocket connected</p>
//       ) : (
//         <p>WebSocket disconnected</p>
//       )}
//     </div>
//   );
// }

// export default ChatPage;



