package com.mmt.service.impl;

import com.mmt.domain.response.PaymentReadyRes;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class PaymentServiceImpl {

    public PaymentReadyRes readyPay(PaymentReadyRes paymentReadyRes) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("cid", "TC0ONETIME");
        return null;
    }

    private HttpHeaders setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK 121971d9ee12aacfe40a56241db0cfbb");
        headers.set("Content-type", "Content-type: application/x-www-form-urlencoded;charset=utf-8");
    }
}
