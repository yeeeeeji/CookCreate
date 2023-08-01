package com.mmt.domain.response.chat;

import com.mmt.domain.entity.chat.Chat;
import com.mmt.domain.entity.chat.Type;
import lombok.Data;

@Data
public class ChatRes {
    private String userId;
    private String nickname;
    private int lessonId;
    private String content;
    private Type type;
    private String createTime;

    public ChatRes(Chat chat) {
        this.content = chat.getContent();
        this.type = chat.getType();
        this.createTime = chat.getCreatedDate().toString();
    }
}
