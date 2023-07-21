package com.mmt.domain.entity.pay;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class PaymentHistory {
    @Id
    private int paymentId;
    private String userId;
    private int lessonId;
    private int totalAmount;
    private int taxFreeAmount;
    private int vatAmount;
    private LocalDateTime ap;

}
