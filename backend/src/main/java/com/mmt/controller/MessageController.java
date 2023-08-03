package com.mmt.controller;

import com.mmt.domain.request.chat.ChatSaveReq;
import com.mmt.service.ChatService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채팅 메세지 API", description = "채팅 메세지 관련 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/message")
public class MessageController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatService chatService;
    /*
        /sub/room/1                     - 구독(lessonId : 1)
        /pub/chat/(enter/message)       - 메세지 발행
     */

    @MessageMapping("/chat/enter")
    public void enter(ChatSaveReq message) {
        message.setContent(message.getNickname() + "님이 채팅방에 입장했습니다.");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getLessonId(), message);

        chatService.saveMessage(message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatSaveReq message) {
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getLessonId(), message);

        chatService.saveMessage(message);
    }
}
