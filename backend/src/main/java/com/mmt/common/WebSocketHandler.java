package com.mmt.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmt.domain.MessageDto;
import com.mmt.domain.entity.chat.Type;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    // 웹 소켓 연결 시
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 세션 저장
        String sessionId = session.getId();
        sessions.put(sessionId, session);

        MessageDto message = MessageDto.builder().sender(sessionId).build();

        // 모든 세션에 알림
        sessions.values().forEach(s -> {
            try {
                if(!s.getId().equals(sessionId)) {
                    s.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
                }
            } catch (Exception e) {

            }
        });

    }

    // 데이터 통신 시
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        MessageDto messageDto = mapper.readValue(message.getPayload(), MessageDto.class);

        WebSocketSession receiver = sessions.get(messageDto.getReceiver());

        if(receiver != null && receiver.isOpen()) {
            receiver.sendMessage(new TextMessage(messageDto.toString()));
        }

    }

    // 웹 소켓 연결 종료 시
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();

        sessions.remove(sessionId);

        final MessageDto message = new MessageDto();
        message.setSender(sessionId);

        sessions.values().forEach(s -> {
            try {
                s.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
            } catch (Exception e) {

            }
        });
    }

    // 웹 소켓 통신 에러 시
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        super.handleTransportError(session, exception);
    }
}
