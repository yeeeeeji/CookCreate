package com.mmt.service;

import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;

public interface MemberService {

    // 회원가입

    public ResponseDto signUp(UserSignUpReq userSignUpReq) throws Exception;

}
