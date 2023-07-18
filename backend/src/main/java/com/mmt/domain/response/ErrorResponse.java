package com.mmt.domain.response;

import com.mmt.domain.HeaderVo;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
    private final HeaderVo headerVo;
}
