// import React from "react";
// import styled from "styled-components";

// const BorderBlock = styled.div`
//   position: relative;
//   text-align: center;
//   width: 100%;
//   padding: 13px 0;
//   & span {
//     position: relative;
//     display: inline-block;
//     // background-color: #b2c7d9;
//     // background-color: #d1cfca;
//     background-color: #ffd3a1;
//     padding: 0 10px;
//   }
//   // &:before {
//   //   content: "";
//   //   display: block;
//   //   position: absolute;
//   //   left: 2%;
//   //   top: 50%;
//   //   width: 96%;
//   //   height: 1px;
//   //   background-color: #727b83;
//   // }
// `;

// const ChatWrapper = styled.div`
//   position: relative;
//   display: inline-block;
//   padding: 7px 8px;
//   border-radius: 4px;
//   margin-bottom: 7px;
//   box-shadow: 0px 1px 2px 0px #8fabc7;
//   max-width: 70%;
//   word-wrap: break-word;
//   white-space: pre-wrap;
// `;
// const RightBlock = styled.div`
//   text-align: right;
//   margin-top: 10px;
//   margin-left: 10px;
//   margin-right: 10px;

//   & ${ChatWrapper} {
//     // background-color: #ffec42;
//     background-color: #ffffff;

//     text-align: left;
//     & span {
//       position: absolute;
//       display: inline-block;
//       &.time {
//         min-width: 65px;
//         text-align: right;
//         bottom: 0;
//         left: -70px;
//       }
//       &.not-read {
//         color: #ffec42;
//         min-width: 30px;
//         text-align: right;
//         bottom: 16px;
//         left: -35px;
//       }
//     }
//   }
// `;
// const LeftBlock = styled.div`
//   position: relative;
//   margin-top: 10px;
//   margin-left: 10px;
//   margin-right: 10px;
//   padding-left: 50px;
//   & ${ChatWrapper} {
//     // background-color: #fff;
//     background-color: #ffe3b0;

//     & span {
//       position: absolute;
//       display: inline-block;
//       &.time {
//         min-width: 65px;
//         text-align: left;
//         bottom: 0;
//         right: -70px;
//       }
//       &.not-read {
//         color: #ffec42;
//         min-width: 30px;
//         text-align: left;
//         bottom: 16px;
//         right: -35px;
//       }
//     }
//   }
//   & img {
//     position: absolute;
//     top: 3px;
//     left: 0;
//     height: 45px;
//     width: 45px;
//     border-radius: 20px;
//     float: left;
//     cursor: pointer;
//   }
// `;




import React from "react";
import styled from "styled-components";

const BorderBlock = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  padding: 13px 0;
  & span {
    position: relative;
    display: inline-block;
    // background-color: #b2c7d9;
    // background-color: #d1cfca;
    background-color: #ffd3a1;
    padding: 0 10px;
  }
  // &:before {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   left: 2%;
  //   top: 50%;
  //   width: 96%;
  //   height: 1px;
  //   background-color: #727b83;
  // }
`;

const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 7px 8px;
  border-radius: 4px;
  margin-bottom: 7px;
  box-shadow: 0px 1px 2px 0px #8fabc7;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
const RightBlock = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  & ${ChatWrapper} {
    // background-color: #ffec42;
    background-color: #ffffff;

    text-align: left;
    & span {
      position: absolute;
      display: inline-block;
      &.time {
        min-width: 65px;
        text-align: right;
        bottom: 0;
        left: -70px;
      }
      &.not-read {
        color: #ffec42;
        min-width: 30px;
        text-align: right;
        bottom: 16px;
        left: -35px;
      }
    }
  }
`;
const LeftBlock = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  & ${ChatWrapper} {
    // background-color: #fff;
    background-color: #ffe3b0;

    & span {
      position: absolute;
      display: inline-block;
      &.time {
        min-width: 65px;
        text-align: left;
        bottom: 0;
        right: -70px;
      }
      &.not-read {
        color: #ffec42;
        min-width: 30px;
        text-align: left;
        bottom: 16px;
        right: -35px;
      }
    }
  }
  & img {
    position: absolute;
    top: 3px;
    left: 0;
    height: 45px;
    width: 45px;
    border-radius: 20px;
    float: left;
    cursor: pointer;
  }
`;





const Chat = ({ message, author}) => {
  return (
    <ChatWrapper>
      <span className="username" style={{ display: 'inherit' }}> {author}</span>
      <div className="message">{message}</div>
      {/* <span className="time">{localeTime}</span> */}
      {/* <span className="not-read">{notRead > 1 ? notRead : ""}</span> */}
    </ChatWrapper>
  );
};

const SeparationBlock = ({ EnterNickname }) => {
  return (
    <BorderBlock>
      <span>{EnterNickname}</span>
    </BorderBlock>
  );
};

const MyChat = ({ content, ...props }) => {
  return (
    <React.Fragment>
      {content ? <SeparationBlock content={content} /> : null}
      <RightBlock>
        <div>
          <Chat {...props} />
        </div>
      </RightBlock>
    </React.Fragment>
  );
};

const FriendChat = ({ author, message }) => {
  return (
    <LeftBlock>
      <div>
        <span className="username" style={{ display: 'inherit' }} >{author}</span>
        <Chat message={message} />
      </div>
    </LeftBlock>
  );
};

export { Chat, MyChat, FriendChat, SeparationBlock };