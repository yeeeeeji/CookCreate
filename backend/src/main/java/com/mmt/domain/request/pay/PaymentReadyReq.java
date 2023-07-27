package com.mmt.domain.request.pay;

import lombok.Data;

@Data
public class PaymentReadyReq {
    private String userId;
    private int lessonId;
}
