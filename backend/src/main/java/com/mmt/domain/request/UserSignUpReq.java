package com.mmt.domain.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSignUpReq {
    private String id;
    private String password;
}
