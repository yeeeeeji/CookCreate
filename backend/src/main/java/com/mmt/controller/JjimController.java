package com.mmt.controller;

import com.mmt.domain.entity.auth.Role;
import com.mmt.domain.entity.auth.UserDetailsImpl;
import com.mmt.domain.request.jjim.JjimReq;
import com.mmt.domain.request.lesson.LessonPostReq;
import com.mmt.domain.request.lesson.LessonPutReq;
import com.mmt.domain.request.lesson.LessonSearchReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.lesson.LessonDetailRes;
import com.mmt.domain.response.lesson.LessonLatestRes;
import com.mmt.domain.response.lesson.LessonSearchRes;
import com.mmt.service.LessonService;
import com.mmt.service.MemberService;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "찜 API", description = "찜 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/jjim")
@RequiredArgsConstructor
public class JjimController {

    private final LessonService lessonService;
    private final MemberService memberService;

    @Operation(summary = "과외 찜하기", description = "과외를 찜한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.(Token expired)",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "403", description = "Cookiee만 이용할 수 있습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 과외입니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "409", description = "마감된 과외입니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping(value = "")
    public ResponseEntity<ResponseDto> wantJjim(JjimReq jjimReq, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication: " + (userDetails.getUsername()));

        String loginId = userDetails.getUsername(); // 현재 로그인한 아이디
        jjimReq.setUserId(loginId);

        ResponseDto responseDto = lessonService.wantJjim(jjimReq);

        return new ResponseEntity<>(responseDto, responseDto.getStatusCode());
    }

    @Operation(summary = "찜 취소하기", description = "과외를 찜 취소한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.(Token expired)",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "403", description = "찜한 Cookiee만 이용할 수 있습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 과외입니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "409", description = "이미 찜 취소한 과외입니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PutMapping(value = "")
    public ResponseEntity<ResponseDto> cancelJjim(@ModelAttribute @Valid LessonPutReq lessonPutReq, BindingResult bindingResult, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication: " + (userDetails.getUsername()));

        if(bindingResult.hasErrors()){ // valid error
            StringBuilder stringBuilder = new StringBuilder();
            for(FieldError fieldError : bindingResult.getFieldErrors()){
                stringBuilder.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(new ResponseDto(HttpStatus.BAD_REQUEST, stringBuilder.toString()), HttpStatus.BAD_REQUEST);
        }

        LessonDetailRes lessonDetailRes = lessonService.getLessonDetail(Integer.parseInt(lessonPutReq.getLessonId()));
        if(lessonDetailRes == null){ // 존재 유무 확인
            return new ResponseEntity<>(new ResponseDto(HttpStatus.NOT_FOUND, "존재하지 않는 과외입니다."), HttpStatus.NOT_FOUND);
        }

        String loginId = userDetails.getUsername(); // 현재 로그인한 아이디
        if(!loginId.equals(lessonDetailRes.getCookyerId())){ // 권한 에러
            return new ResponseEntity<>(new ResponseDto(HttpStatus.FORBIDDEN, "예약한 Cookyer만 이용 가능합니다."), HttpStatus.FORBIDDEN);
        }

        lessonPutReq.setCookyerId(loginId);
        ResponseDto responseDto = lessonService.modifyLesson(lessonPutReq);

        return new ResponseEntity<>(responseDto, responseDto.getStatusCode());
    }

    @Operation(summary = "찜 목록 조회", description = "찜 목록을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = LessonDetailRes.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.(Token expired)",
                    content = @Content(schema = @Schema(implementation = LessonDetailRes.class))),
            @ApiResponse(responseCode = "403", description = "본인만 확인할 수 있습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "찜한 과외입니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
    })
    @GetMapping("")
    public ResponseEntity<LessonDetailRes> getJjimList(@PathVariable(value = "lessonId") int lessonId, Authentication authentication){
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        log.debug("authentication: " + (userDetails.getUsername()));

        return new ResponseEntity<>(lessonService.getLessonDetail(lessonId), HttpStatus.OK);
    }
}
