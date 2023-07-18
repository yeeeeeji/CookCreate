package com.mmt.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode{

    NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 자원입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "권한이 없습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "유효한 인증이 아닙니다.");

    private final HttpStatus resultCode;
    private final String resultMessage;
}
