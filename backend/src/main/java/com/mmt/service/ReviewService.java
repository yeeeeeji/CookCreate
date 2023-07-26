package com.mmt.service;

import com.mmt.domain.request.review.ReviewPostReq;
import com.mmt.domain.request.review.ReviewPutReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.review.ReviewDetailRes;

public interface ReviewService {
    ResponseDto register(ReviewPostReq reviewPostReq);
    ReviewDetailRes getDetailReview(int reviewId);
    ResponseDto modify(ReviewPutReq reviewPutReq);
    ResponseDto delete(int reviewId, String loginId);
}
