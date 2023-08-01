package com.mmt.service;

import com.mmt.domain.request.lesson.LessonPostReq;
import com.mmt.domain.request.lesson.LessonPutReq;
import com.mmt.domain.request.lesson.LessonSearchReq;
import com.mmt.domain.request.lesson.LessonStepPutReq;
import com.mmt.domain.response.lesson.LessonDetailRes;
import com.mmt.domain.response.lesson.LessonLatestRes;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.lesson.LessonSearchRes;
import com.mmt.domain.response.lesson.LessonStepRes;
import org.springframework.web.multipart.MultipartFile;
import com.mmt.domain.request.session.SessionCreateReq;

import java.util.List;

public interface LessonService {

    ResponseDto reserve(MultipartFile multipartFile, LessonPostReq lessonPostReq);
    ResponseDto apply(int lessonId, String userId);
    ResponseDto modifyLesson(MultipartFile multipartFile, LessonPutReq lessonPutReq);
    ResponseDto deleteLesson(int lessonId);
    ResponseDto cancelLesson(int lessonId, String userId);
    ResponseDto createSession(int lessonId, SessionCreateReq sessionCreateReq);
    ResponseDto shutdownSession(int lessonId);
    List<LessonSearchRes> getLessonList(LessonSearchReq lessonSearchReq);
    LessonDetailRes getLessonDetail(int lessonId);
    LessonLatestRes getLessonLatest(String userId);
    List<LessonStepRes> getLessonStep(int lessonId);
    ResponseDto modifyLessonStep(String userId, LessonStepPutReq lessonStepPutReq);
}
