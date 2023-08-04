package com.mmt.service.impl;

import com.mmt.domain.entity.auth.Member;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.pay.PayStatus;
import com.mmt.domain.entity.pay.PaymentHistory;
import com.mmt.domain.request.pay.PaymentReadyReq;
import com.mmt.domain.response.my.MyPaymentRes;
import com.mmt.domain.response.pay.PaymentApproveRes;
import com.mmt.domain.response.pay.PaymentReadyRes;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.repository.PaymentRepository;
import com.mmt.repository.lesson.LessonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl {
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final LessonRepository lessonRepository;
    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com/v1/payment")
                .defaultHeaders(h -> h.addAll(setHeaders()))
                .build();
    }

    @Transactional
    public PaymentReadyRes readyPay(PaymentReadyReq paymentReadyReq) {
        Member member = memberRepository.findByUserId(paymentReadyReq.getUserId()).get();
        Lesson lesson = lessonRepository.findById(paymentReadyReq.getLessonId()).get();

        PaymentHistory paymentHistory = new PaymentHistory();

        paymentHistory.setTotalAmount(lesson.getPrice());
        paymentHistory.setMember(member);
        paymentHistory.setLesson(lesson);
        paymentRepository.save(paymentHistory);

        MultiValueMap<String, String> parameter = new LinkedMultiValueMap<>();

        parameter.add("cid", "TC0ONETIME");
        parameter.add("partner_order_id", String.valueOf(paymentHistory.getPaymentId()));
        parameter.add("partner_user_id", paymentReadyReq.getUserId());
        parameter.add("item_name",paymentHistory.getLesson().getLessonTitle());
        parameter.add("quantity", "1");
        parameter.add("total_amount", String.valueOf(paymentHistory.getTotalAmount()));
        parameter.add("tax_free_amount", "0");
        parameter.add("approval_url", "http://localhost:8080/api/v1/pay/completed?paymentId=" + paymentHistory.getPaymentId());
        parameter.add("cancel_url", "http://localhost:8080/api/v1/pay/cancel?paymentId=" + paymentHistory.getPaymentId());
        parameter.add("fail_url", "http://localhost:8080/api/v1/pay/fail?paymentId=" + paymentHistory.getPaymentId());

        log.debug("use webClient before");

        PaymentReadyRes paymentReadyRes = webClient.post()
                .uri("/ready")
                .body(BodyInserters.fromFormData(parameter))
                .retrieve()
                .bodyToMono(PaymentReadyRes.class)
                .block();

        paymentHistory.setTId(paymentReadyRes.getTid());
        paymentHistory.setPayStatus(PayStatus.READY);
        paymentRepository.save(paymentHistory);

        paymentReadyRes.setTid(null);

        return paymentReadyRes;
    }

    public MyPaymentRes approvePay(String pg_Token, int paymentId) {
        PaymentHistory paymentHistory = paymentRepository.findByPaymentId(paymentId).get();
        log.debug("userId: " + paymentHistory.getMember().getUserId());
        log.debug("tid: " + paymentHistory.getTId());
        log.debug("pg_token: " + pg_Token);

        MultiValueMap<String, String> parameter = new LinkedMultiValueMap<>();

        parameter.add("cid", "TC0ONETIME");
        parameter.add("tid", paymentHistory.getTId());
        parameter.add("partner_order_id", String.valueOf(paymentId));
        parameter.add("partner_user_id", paymentHistory.getMember().getUserId());
        parameter.add("pg_token", pg_Token);

        PaymentApproveRes paymentApproveRes = webClient.post()
                .uri("/approve")
                .body(BodyInserters.fromFormData(parameter))
                .retrieve()
                .bodyToMono(PaymentApproveRes.class)
                .block();

        paymentHistory.setApprovedAt(paymentApproveRes.getApproved_at());
        paymentHistory.setPayStatus(PayStatus.COMPLETED);
        paymentRepository.save(paymentHistory);

        if(paymentHistory.getApprovedAt() == null) {
            return new MyPaymentRes(HttpStatus.BAD_REQUEST, "결제에 실패했습니다.");
        }

        MyPaymentRes myPaymentRes = new MyPaymentRes(paymentHistory);
        myPaymentRes.setStatusCode(HttpStatus.OK);
        myPaymentRes.setMessage("success");

        return myPaymentRes;
    }

    public ResponseDto failPay(int paymentId) {
        PaymentHistory paymentHistory = paymentRepository.findByPaymentId(paymentId).get();
        paymentHistory.setPayStatus(PayStatus.FAIL);
        paymentRepository.save(paymentHistory);

        return new ResponseDto(HttpStatus.BAD_REQUEST, "결제에 실패했습니다.");
    }

    public ResponseDto cancelPay(int paymentId) {
        PaymentHistory paymentHistory = paymentRepository.findByPaymentId(paymentId).get();
        paymentHistory.setPayStatus(PayStatus.CANCEL);
        paymentRepository.save(paymentHistory);

        return new ResponseDto(HttpStatus.BAD_REQUEST, "결제 진행 중 취소되었습니다.");
    }

    private HttpHeaders setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK 121971d9ee12aacfe40a56241db0cfbb");
        headers.set("Content-type", "Content-type: application/x-www-form-urlencoded;charset=utf-8");
        return headers;
    }
}
