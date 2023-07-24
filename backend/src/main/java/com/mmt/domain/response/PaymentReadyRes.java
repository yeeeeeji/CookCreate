package com.mmt.domain.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class PaymentReadyRes {
    private String tid;
    private String next_redirect_pc_url;
    private LocalDateTime created_at;
}
