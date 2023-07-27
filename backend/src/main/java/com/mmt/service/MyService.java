package com.mmt.service;

import com.mmt.domain.response.lesson.MyLessonAppliedRes;

import java.util.List;

public interface MyService {

    List<MyLessonAppliedRes> getLessonApplied(String userId);
}
