package com.mmt.service;


import com.mmt.domain.response.lesson.MyLessonRes;

import java.util.List;

public interface MyService {

    List<MyLessonRes> getMyLesson(String userId, boolean isCompleted);
}
