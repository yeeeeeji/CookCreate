package com.mmt.domain.response;

import lombok.Data;

@Data
public class PaymentReadyRes {
    private String userId;
    private int lessonId;
    private String next_redirect_pc_url;
    private String tId;
}
