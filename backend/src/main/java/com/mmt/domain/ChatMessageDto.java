package com.mmt.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {
    private int lessonId;
    private String userId;
    private String content;
    private String type;
    private LocalDateTime createdTime;
}
