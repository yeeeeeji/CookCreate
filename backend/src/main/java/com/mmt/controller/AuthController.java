package com.mmt.controller;

import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증 API", description = "인증 관련 API 입니다.")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @Operation(summary = "회원 가입", description = "회원 가입한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation",
                    content = @Content(schema = @Schema(implementation = UserSignUpReq.class)))
    })
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
