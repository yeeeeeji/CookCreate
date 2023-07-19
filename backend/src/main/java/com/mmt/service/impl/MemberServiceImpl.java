package com.mmt.service.impl;

import com.mmt.common.auth.JwtUtil;
import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.repository.RefreshTokenRepository;
import com.mmt.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @Override
    public ResponseDto signUp(UserSignUpReq userSignUpReq) throws Exception {

        // 패스워드 암호화
        userSignUpReq.setEncodePw(passwordEncoder.encode(userSignUpReq.getUserPw()));
        Member member = new Member(userSignUpReq);

        // 회원가입 성공
        memberRepository.save(member);
        return new ResponseDto(HttpStatus.OK.value(), "Success");
    }
}
