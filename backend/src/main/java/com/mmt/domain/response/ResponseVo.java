package com.mmt.domain.response;

import java.util.ArrayList;

import lombok.Builder;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@ToString
public class ResponseVo {
    private final HttpStatus status;
    private final String message;
    private final Integer size;
    private final ArrayList<?> items;

    @Builder
    public ResponseVo(HttpStatus status, String message, Integer size, ArrayList<?> items) {
        this.status = status;
        this.message = message;
        this.size = size;
        this.items = items;
    }
}
