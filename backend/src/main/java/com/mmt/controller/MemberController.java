package com.mmt.controller;

import com.mmt.domain.entity.UserDetailsImpl;
import com.mmt.domain.request.UserUpdateReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.UserInfoRes;
import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Tag(name = "멤버 API", description = "멤버 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "회원 정보 조회", description = "<b>로그인한 회원 정보를 조회</b>한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = UserInfoRes.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.",
                    content = @Content(schema = @Schema(implementation = UserInfoRes.class))),
            @ApiResponse(responseCode = "403", description = "권한이 없습니다.",
                    content = @Content(schema = @Schema(implementation = UserInfoRes.class)))
    })
    @GetMapping("/{userId}")
    public ResponseEntity<UserInfoRes> getUserInfo(@Parameter(description = "회원 id") @PathVariable String userId, Authentication authentication) {
        log.debug("userId : " + userId);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication: " + (authentication.getPrincipal()));
        if(userDetails.getUsername().equals(userId)) {
            UserInfoRes userInfoRes = new UserInfoRes(memberService.getUserInfo(userId));

            return ResponseEntity.status(200).body(userInfoRes);
        }
        return ResponseEntity.status(403).body(null);
    }

    @Operation(summary = "회원 정보 수정", description = "<b>로그인한 회원 정보를 수정</b>한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "403", description = "권한이 없습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PutMapping("/{userId}")
    public ResponseDto updateUserInfo(
            @Parameter(description = "회원 id") @PathVariable String userId,
            @RequestBody UserUpdateReq userUpdateReq, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        if(userDetails.getUsername().equals(userId)) {
            return memberService.updateUserInfo(userId, userUpdateReq);
        }

        return new ResponseDto(HttpStatus.FORBIDDEN, "권한이 없습니다.");
    }

    @Operation(summary = "로그아웃", description = "<b>로그인 상태인 사용자가 로그아웃</b>한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/logout")
    public ResponseDto login(HttpServletRequest request, HttpServletResponse response) {
        return memberService.logout(request, response);
    }

}
