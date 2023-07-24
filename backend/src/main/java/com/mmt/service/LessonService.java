package com.mmt.service;

import com.mmt.domain.request.LessonPostReq;
import com.mmt.domain.response.LessonDetailRes;
import com.mmt.domain.response.LessonLatestRes;
import com.mmt.domain.response.ResponseDto;

public interface LessonService {

    ResponseDto reserve(LessonPostReq lessonPostReq);
    LessonDetailRes getLessonDetail(int lessonId);
    LessonLatestRes getLessonLatest(String userId);
}
