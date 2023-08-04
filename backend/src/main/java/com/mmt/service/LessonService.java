package com.mmt.service;

import com.mmt.domain.request.lesson.LessonPostReq;
import com.mmt.domain.request.lesson.LessonPutReq;
import com.mmt.domain.request.lesson.LessonSearchReq;
import com.mmt.domain.request.lesson.LessonStepPutReq;
import com.mmt.domain.request.session.SessionPostReq;
import com.mmt.domain.response.lesson.LessonDetailRes;
import com.mmt.domain.response.lesson.LessonLatestRes;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.lesson.LessonSearchRes;
import com.mmt.domain.response.lesson.LessonStepRes;

import java.util.List;

public interface LessonService {

    ResponseDto reserve(LessonPostReq lessonPostReq);
    ResponseDto apply(int lessonId, String userId);
    ResponseDto modifyLesson(LessonPutReq lessonPutReq);
    ResponseDto deleteLesson(int lessonId);
    ResponseDto cancelLesson(int lessonId, String userId);
    List<LessonSearchRes> getLessonList(LessonSearchReq lessonSearchReq);
    LessonDetailRes getLessonDetail(int lessonId);
    LessonLatestRes getLessonLatest(String userId);
    List<LessonStepRes> getLessonStep(int lessonId);
    ResponseDto modifyLessonStep(String userId, LessonStepPutReq lessonStepPutReq);

    ResponseDto createSession(SessionPostReq sessionPostReq);
    ResponseDto checkSession(SessionPostReq sessionPostReq);
    String getSessionId(int lessonId);
    ResponseDto deleteSession(SessionPostReq sessionPostReq);
}
