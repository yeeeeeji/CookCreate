package com.mmt.service;

import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserSignUpReq;

public interface MemberService {

    // 회원가입

    public Member signUp(UserSignUpReq userInfo) throws Exception;

}
