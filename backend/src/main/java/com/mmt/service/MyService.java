package com.mmt.service;


import com.mmt.domain.response.my.MyLessonRes;
import com.mmt.domain.response.my.MyRecipeRes;
import com.mmt.domain.response.my.MyReviewRes;

import java.util.List;

public interface MyService {

    List<MyLessonRes> getMyLesson(String userId, boolean isCompleted);
    List<MyRecipeRes> getMyRecipe(String userId);
    List<MyReviewRes> getMyReview(String userId);
}
