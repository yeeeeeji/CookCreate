package com.mmt.controller;

import com.mmt.common.auth.TokenProvider;
import com.mmt.domain.TokenDto;
import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserLoginPostReq;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.repository.MemberRepository;
import com.mmt.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

//    private final TokenProvider tokenProvider;
//    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @PostMapping("/signup")
    public Member signup(@RequestBody UserSignUpReq userInfo) throws Exception {
        return memberService.signUp(userInfo);
    }

//    @PostMapping("/login")
//    public ResponseEntity<TokenDto> login(@RequestBody UserLoginPostReq userInfo) {
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(userInfo.getId(), userInfo.getPassword());
//
//
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//    }
}
