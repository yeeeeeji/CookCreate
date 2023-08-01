package com.mmt.domain.response.chat;

import com.mmt.domain.entity.lesson.Lesson;
import lombok.Data;

@Data
public class ChatRoomRes {
    private int lessonId;
    private String lessonTitle;
    private String leastContent;
    private String lestCreateTime;

    public ChatRoomRes(Lesson lesson) {
        this.lessonId = lesson.getLessonId();
        this.lessonTitle = lesson.getLessonTitle();
    }
}
