package com.mmt.domain;

import com.mmt.domain.entity.chat.Type;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private String userId;
    private String lessonId;
    private Object data;
}
