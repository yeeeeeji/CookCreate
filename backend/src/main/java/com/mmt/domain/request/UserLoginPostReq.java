package com.mmt.domain.request;

import lombok.Data;

@Data
public class UserLoginPostReq {
    private String id;
    private String password;
}
