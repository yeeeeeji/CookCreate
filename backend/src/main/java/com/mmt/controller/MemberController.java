package com.mmt.controller;

import com.mmt.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 API", description = "멤버 관련 API입니다.")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


}
