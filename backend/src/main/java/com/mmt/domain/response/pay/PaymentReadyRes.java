package com.mmt.domain.response.pay;

import com.mmt.domain.response.ResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class PaymentReadyRes extends ResponseDto {
    private String tid;
    private String next_redirect_pc_url;
    private LocalDateTime created_at;
}
