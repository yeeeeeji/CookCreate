package com.mmt.domain.request.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatSaveReq {
    private String userId;
    private String nickname;
    private int lessonId;
    private String content;

}