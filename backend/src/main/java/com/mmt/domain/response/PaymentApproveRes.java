package com.mmt.domain.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentApproveRes {
    private String aid;
    private String tid;
    private String cid;
    private String partner_order_id;
    private String partner_user_id;
    private Amount amount;
    private CardInfo card_info;
    private String item_name;
    private LocalDateTime created_at;
    private LocalDateTime approved_at;

}
