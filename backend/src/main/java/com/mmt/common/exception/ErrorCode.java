package com.mmt.common.exception;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
    String name();
    HttpStatus getResultCode();
    String getResultMessage();
}
