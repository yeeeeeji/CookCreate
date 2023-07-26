package com.mmt.service;

import com.mmt.domain.request.ReviewPostReq;
import com.mmt.domain.response.ResponseDto;

public interface ReviewService {
    ResponseDto register(ReviewPostReq reviewPostReq);
}
