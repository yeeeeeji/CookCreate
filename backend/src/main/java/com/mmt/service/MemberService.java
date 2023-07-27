package com.mmt.service;

import com.mmt.domain.entity.auth.Role;
import com.mmt.domain.entity.auth.Member;
import com.mmt.domain.request.UserLoginPostReq;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.request.UserUpdateReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.UserInfoRes;
import com.mmt.domain.response.UserLoginRes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface MemberService {

    // 회원가입
    public ResponseDto signUp(UserSignUpReq userSignUpReq) throws Exception;
    public UserLoginRes login(UserLoginPostReq userLoginPostReq, HttpServletResponse response);

    public ResponseDto logout(HttpServletRequest request, HttpServletResponse response);
    public UserInfoRes getUserInfo(String userId);
    public ResponseDto updateUserInfo(String userId, UserUpdateReq userUpdateReq);
    public ResponseDto deleteUser(String userId);

    public ResponseDto checkUserId(String userId);
    public ResponseDto checkNickname(String nickname);

    public Role getRole(String userID);
}
