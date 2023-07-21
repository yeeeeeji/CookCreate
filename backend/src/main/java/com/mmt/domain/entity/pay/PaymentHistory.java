package com.mmt.domain.entity.pay;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class PaymentHistory {
    @Id @GeneratedValue
    private int paymentId;
    private String userId;
    private int lessonId;
    private int totalAmount;
    private int taxFreeAmount;
    private int vatAmount;
    private String tid;
    private String status;
    private LocalDateTime approved_at;

}
