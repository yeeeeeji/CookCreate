package com.mmt.controller;

import com.mmt.domain.request.PaymentReadyReq;
import com.mmt.domain.response.PaymentApproveRes;
import com.mmt.domain.response.PaymentReadyRes;
import com.mmt.service.impl.PaymentServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "결제 API", description = "결제 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/api/v1/pay")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService;

    @GetMapping("/ready")
    public ResponseEntity<PaymentReadyRes> readyPay(@RequestBody PaymentReadyReq paymentReadyReq) {
        PaymentReadyRes paymentReadyRes = paymentService.readyPay(paymentReadyReq);
        log.debug(paymentReadyRes.getUserId());
        return ResponseEntity.status(200).body(paymentReadyRes);
    }

    @GetMapping("/completed")
    public ResponseEntity<PaymentApproveRes> approvePay(String pgToken) {
        return null;
    }
}
