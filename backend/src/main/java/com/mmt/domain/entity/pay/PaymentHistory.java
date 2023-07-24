package com.mmt.domain.entity.pay;

import com.mmt.domain.entity.Auth.Member;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.request.PaymentReadyReq;
import com.mmt.domain.response.PaymentApproveRes;
import com.mmt.domain.response.PaymentReadyRes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PaymentHistory {
    @Id @GeneratedValue
    private int paymentId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    private String tId;
    private int totalAmount;
    private String cardInfo;
    private String status;
    private LocalDateTime approved_at;

}
