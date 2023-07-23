package com.mmt.service.impl;

import com.mmt.domain.request.PaymentReadyReq;
import com.mmt.domain.response.PaymentReadyRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import java.util.function.Consumer;

@Slf4j
@Service
public class PaymentServiceImpl {
    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com/v1/payment")
                .defaultHeaders(h -> h.addAll(setHeaders()))
                .build();
    }

    public PaymentReadyRes readyPay(PaymentReadyReq paymentReadyReq) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("cid", "TC0ONETIME");
        map.add("partner_order_id", "string");
        map.add("partner_user_id", paymentReadyReq.getUserId());
        map.add("item_name", "string");
        map.add("quantity", "0");
        map.add("total_amount", String.valueOf(paymentReadyReq.getTotalAmount()));
        map.add("tax_free_amount", "0");
        map.add("approval_url", "http://localhost:8080/api/v1/pay/completed");
        map.add("cancel_url", "http://localhost:8080/api/v1/pay/cancel");
        map.add("fail_url", "http://localhost:8080/api/v1/pay/fail");

        log.debug("use webClient before");

        return webClient.post()
                .uri("/ready")
                .body(BodyInserters.fromFormData(map))
                .retrieve()
                .bodyToMono(PaymentReadyRes.class)
                .block();
    }

    private HttpHeaders setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK 121971d9ee12aacfe40a56241db0cfbb");
        headers.set("Content-type", "Content-type: application/x-www-form-urlencoded;charset=utf-8");
        return headers;
    }
}
