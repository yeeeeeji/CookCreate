package com.mmt.controller;

import com.mmt.domain.entity.Auth.UserDetailsImpl;
import com.mmt.domain.entity.Role;
import com.mmt.domain.request.SessionCreateReq;
import com.mmt.domain.request.lesson.LessonPostReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.service.LessonService;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Tag(name = "과외 세션 API", description = "과외 세션 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/session")
@RequiredArgsConstructor
public class SessionController {
    private final LessonService lessonService;
    private final MemberService memberService;

    @Operation(summary = "과외 세션 생성", description = "과외 세션을 생성한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "형식을 맞춰주세요.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.(Token expired)",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "403", description = "Cookyer만 이용 가능합니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PutMapping("/{lessonId}")
    public ResponseEntity<ResponseDto> create(
            @Parameter(description = "레슨 id") @PathVariable int lessonId,
            @RequestBody SessionCreateReq sessionCreateReq, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication : " + (userDetails.getUsername()));

        String loginId = userDetails.getUsername();
        if(!memberService.getRole(loginId).equals(Role.COOKYER)){
            return new ResponseEntity<>(new ResponseDto(HttpStatus.FORBIDDEN, "Cookiee는 과외 방을 생성할 수 없습니다."), HttpStatus.FORBIDDEN);
        }

        if(!isBlank(lessonService.getLessonDetail(lessonId).getSessionId())) {
            return new ResponseEntity<>(new ResponseDto(HttpStatus.CONFLICT, "이 cookyer에게는 이미 세션이 할당 되있습니다."), HttpStatus.CONFLICT);
        }

        ResponseDto responseDto = lessonService.createSession(lessonId, sessionCreateReq);

        return new ResponseEntity<>(responseDto, responseDto.getStatusCode());
    }
}
