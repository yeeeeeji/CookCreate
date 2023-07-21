package com.mmt.controller;

import com.mmt.domain.response.PaymentReadyRes;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "결제 API", description = "결제 관련 API입니다.")
@RestController
@RequestMapping("/api/v1/pay")
public class PaymentController {

    @PostMapping("/ready")
    public ResponseEntity<PaymentReadyRes> readyPayment() {
        return null;
    }
}
