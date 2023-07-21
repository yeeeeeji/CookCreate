package com.mmt.domain.request;

import lombok.Data;

@Data
public class PaymentReadyReq {
    private String userId;
    private int lessonId;
    private int totalAmount;
}
