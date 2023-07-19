package com.mmt.controller;

import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseDto signup(@RequestBody UserSignUpReq userSignUpReq) throws Exception {
        return memberService.signUp(userSignUpReq);
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
