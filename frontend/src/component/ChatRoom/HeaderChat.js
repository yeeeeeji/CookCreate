import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  background-color: #ff8a00;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  flex-direction: row-reverse;

  & span {
    font-weight: bold;
    font-size: 20px;
    margin-right: 50px;
    text-align: center;
    flex-grow: 1;

  & button {
    font-size: 20px;
    background-color: #a9bdce;
    outline: none;
    cursor: pointer;
    &:hover {
      color: #dcdcdc;
    }
  }
`;

const HeaderChat = (props) => {
  // const { room_name, hideRoom } = props;

  const onBackBtnClick = (event) => {
    event.preventDefault();
    // hideRoom();
  };

  return (
    <Wrapper>
      <button type="button" onClick={onBackBtnClick}>
        <p>나가기</p>
        <i className="fas fa-arrow-left" />
      </button>
  
      <span>채팅방이름</span>
    </Wrapper>
  );
};

export default HeaderChat;
