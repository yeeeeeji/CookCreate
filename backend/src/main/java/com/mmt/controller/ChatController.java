package com.mmt.controller;

import com.mmt.domain.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    /*
        /sub/room/1     - 구독(ressonId : 1)
        /pub/send       - 메세지 발행
     */

    @MessageMapping("/send")
    public void message(MessageDto message) {
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getLessonId(), message);
    }

}
