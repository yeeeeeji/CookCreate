package com.mmt.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode{

    NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 자원입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "존재하지 않는 자원입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "존재하지 않는 자원입니다.");

    private final HttpStatus resultCode;
    private final String resultMessage;
}
