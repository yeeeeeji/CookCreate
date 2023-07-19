package com.mmt.controller;

import com.mmt.domain.TokenDto;
import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserLoginPostReq;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

@Tag(name = "회원 API", description = "회원 관련 API 입니다.")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @Operation(summary = "회원 가입", description = "회원 가입한다.")
    @PostMapping("/signup")
    public ResponseDto signup(@Parameter(description = "회원 가입 정보", required = true) @RequestBody UserSignUpReq userSignUpReq) throws Exception {
        return memberService.signUp(userSignUpReq);
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody UserLoginPostReq userLoginPostReq, HttpServletResponse response) {
        return memberService.login(userLoginPostReq, response);
    }
}
