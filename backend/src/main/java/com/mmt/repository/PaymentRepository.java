package com.mmt.repository;

import com.mmt.domain.entity.pay.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentHistory, Integer> {
    Optional<PaymentHistory> findByPaymentId(int paymentId);

    Optional<PaymentHistory> findByLesson_LessonIdAndMember_UserId(int lessonId, String userId);
}
