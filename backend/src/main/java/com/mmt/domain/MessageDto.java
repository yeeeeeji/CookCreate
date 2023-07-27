package com.mmt.domain;

import com.mmt.domain.entity.chat.Type;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private String sender;
    private String receiver;
    private Object data;
}
