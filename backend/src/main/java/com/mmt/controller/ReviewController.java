package com.mmt.controller;

import com.mmt.domain.entity.Auth.UserDetailsImpl;
import com.mmt.domain.entity.Role;
import com.mmt.domain.request.ReviewPostReq;
import com.mmt.domain.request.lesson.LessonPostReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.service.MemberService;
import com.mmt.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "리뷰 API", description = "리뷰 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;

    @Operation(summary = "리뷰 등록하기", description = "리뷰를 등록한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "형식을 맞춰주세요.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.(Token expired)",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "403", description = "수강한 Cookiee만 이용 가능합니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("")
    public ResponseEntity<ResponseDto> register(@RequestBody @Valid ReviewPostReq reviewPostReq, BindingResult bindingResult, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication: " + (userDetails.getUsername()));

        if(bindingResult.hasErrors()){ // valid error
            StringBuilder stringBuilder = new StringBuilder();
            for(FieldError fieldError : bindingResult.getFieldErrors()){
                stringBuilder.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(new ResponseDto(HttpStatus.BAD_REQUEST, stringBuilder.toString()), HttpStatus.BAD_REQUEST);
        }

        String loginId = userDetails.getUsername(); // 현재 로그인한 아이디
        if(!memberService.getRole(loginId).equals(Role.COOKIEE)){ // 권한 에러
            return new ResponseEntity<>(new ResponseDto(HttpStatus.FORBIDDEN, "Cookyiee만 이용 가능합니다."), HttpStatus.FORBIDDEN);
        }

        reviewPostReq.setUserId(loginId);
        ResponseDto responseDto = reviewService.register(reviewPostReq);

        return new ResponseEntity<>(responseDto, responseDto.getStatusCode());
    }
}
