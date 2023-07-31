package com.mmt.domain;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatDto {
    private String userId;
    private String nickName;
    private int lessonId;
    private String contents;
}
