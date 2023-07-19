package com.mmt.controller;

import com.mmt.domain.entity.UserDetailsImpl;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.UserInfoRes;
import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 API", description = "멤버 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회", description = "<b>로그인한 회원 정보를 조회</b>한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success"),
            @ApiResponse(responseCode = "400", description = "bad request operation")
    })
    @GetMapping()
    public ResponseEntity<UserInfoRes> getUserInfo(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getDetails();
        String userId = userDetails.getUsername();
        log.debug("userId : " + userId);
        UserInfoRes userInfoRes = new UserInfoRes(memberService.getUserInfo(userId));

        return ResponseEntity.status(200).body(userInfoRes);
    }




}
