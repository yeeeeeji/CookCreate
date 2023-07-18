package com.mmt.domain;

import lombok.Data;

@Data
public class HeaderVo {
    private int status;
    private String message;
    private Integer size;
    private String error;
}
