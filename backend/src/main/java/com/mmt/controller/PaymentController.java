package com.mmt.controller;

import com.mmt.domain.entity.auth.UserDetailsImpl;
import com.mmt.domain.request.pay.PaymentReadyReq;
import com.mmt.domain.response.my.MyPaymentRes;
import com.mmt.domain.response.pay.PaymentReadyRes;
import com.mmt.domain.response.ResponseDto;
import com.mmt.service.impl.PaymentServiceImpl;
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

@Tag(name = "결제 API", description = "결제 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/pay")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService;

    @Operation(summary = "결제 준비 & 요청", description = "<b>로그인한 회원이 선택한 수업을 결제</b>한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 후 이용해주세요.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "결제 진행 중 취소되었습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "결제에 실패했습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/ready/{lessonId}")
    public ResponseEntity<? extends ResponseDto> readyPay(@PathVariable int lessonId, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String userId = userDetails.getUsername();

        PaymentReadyReq paymentReadyReq = new PaymentReadyReq(userId, lessonId);

        PaymentReadyRes paymentReadyRes = paymentService.readyPay(paymentReadyReq);
        paymentReadyRes.setStatusCode(HttpStatus.OK);
        paymentReadyRes.setMessage("success");

        return new ResponseEntity<>(paymentReadyRes, HttpStatus.OK);
    }

    @Parameter(hidden = true)
    @GetMapping("/completed")
    public ResponseEntity<? extends ResponseDto> approvePay(String pg_token, int paymentId) {
        MyPaymentRes responseDto = paymentService.approvePay(pg_token, paymentId);
        return new ResponseEntity<>(responseDto, responseDto.getStatusCode());
    }

    @Parameter(hidden = true)
    @GetMapping("/fail")
    public ResponseEntity<ResponseDto> failPay(int paymentId) {
        ResponseDto responseDto = paymentService.failPay(paymentId);
        return ResponseEntity.status(400).body(responseDto);
    }

    @Parameter(hidden = true)
    @GetMapping("/cancel")
    public ResponseEntity<ResponseDto> cancelPay(int paymentId) {
        // TODO: 취소 처리
        ResponseDto responseDto = paymentService.cancelPay(paymentId);
        return ResponseEntity.status(400).body(responseDto);
    }

}
