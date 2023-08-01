package com.mmt.domain.request.auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserUpdateReq {
//    private String userPw;
//    private String userPwCk;
    private String nickname;
    private String phoneNumber;
    private String userEmail;
    private List<Integer> food;
    private String introduce;
    private String profileImg;
    private String introUrl;

//    public void setEncodePw(String encodePw){
//        this.userPw = encodePw;
//    }
}
