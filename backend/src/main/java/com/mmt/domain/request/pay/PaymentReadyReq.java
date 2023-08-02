package com.mmt.domain.request.pay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class PaymentReadyReq {
    private String userId;
    private int lessonId;
}
