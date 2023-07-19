package com.mmt.controller;

import com.mmt.domain.request.UserLoginPostReq;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Tag(name = "인증 API", description = "인증 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @Operation(summary = "회원 가입", description = "회원 가입한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "success",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class)))
    })
    @PostMapping("/signup")
    public ResponseDto signup(@RequestBody UserSignUpReq userSignUpReq) throws Exception {
        return memberService.signUp(userSignUpReq);
    }

    @Operation(summary = "로그인", description = "<b>아이디와 비밀번호</b>를 입력해 로그인 한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 계정입니다.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "401", description = "아이디와 비밀번호를 확인해주세요.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class)))
    })
    @PostMapping("/login")
    public ResponseDto login(@RequestBody UserLoginPostReq userLoginPostReq, HttpServletResponse response) {
        return memberService.login(userLoginPostReq, response);
    }

    @Operation(summary = "아이디 중복 체크", description = "존재하는 아이디인지 확인한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용 가능한 아이디입니다.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "409", description = "이미 존재하는 아이디입니다.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class)))
    })
    @GetMapping("/check/{userId}")
    public ResponseDto checkUserId(@PathVariable("userId") String userId) {
        return memberService.checkUserId(userId);
    }

    @Operation(summary = "닉네임 중복 체크", description = "존재하는 닉네임인지 확인한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용 가능한 닉네임입니다.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "409", description = "이미 존재하는 닉네임입니다.",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class)))
    })
    @GetMapping("/check/{nickname}")
    public ResponseDto checkNickname(@PathVariable("nickname") String nickname) {
        return memberService.checkNickname(nickname);
    }
}
