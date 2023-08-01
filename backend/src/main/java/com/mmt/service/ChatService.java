package com.mmt.service;

import com.mmt.domain.request.chat.ChatSaveReq;
import com.mmt.domain.response.chat.ChatRes;
import com.mmt.domain.response.chat.ChatRoomRes;

import java.util.List;

public interface ChatService {
    void saveMessage(ChatSaveReq message);
    void closeChatRoom(int lessonId);
    List<ChatRes> getChatMessageList(int lessenId);
    List<ChatRoomRes> getChatRoomList(String userId);
}

