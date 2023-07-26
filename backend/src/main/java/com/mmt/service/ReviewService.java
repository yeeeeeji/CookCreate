package com.mmt.service;

import com.mmt.domain.request.review.ReviewPostReq;
import com.mmt.domain.request.review.ReviewPutReq;
import com.mmt.domain.response.ResponseDto;

public interface ReviewService {
    ResponseDto register(ReviewPostReq reviewPostReq);
    ResponseDto modify(ReviewPutReq reviewPutReq);
    ResponseDto delete(int reviewId, String loginId);
}
