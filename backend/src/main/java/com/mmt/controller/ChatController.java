package com.mmt.controller;

import com.mmt.domain.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    /*
        /sub/room/1     - 구독(ressonId : 1)
        /pub/send       - 메세지 발행
     */

    @MessageMapping("/chat/enter")
    public void enter(ChatDto chat) {
        chat.setContents(chat.getNickName() + "님이 채팅방에 입장했습니다.");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + chat.getLessonId(), chat);
    }

    @MessageMapping("/chat/message")
    public void message(ChatDto chat) {
        simpMessageSendingOperations.convertAndSend("/sub/room/" + chat.getLessonId(), chat);
    }

}
