package com.mmt.domain.response.lesson;

import com.mmt.domain.entity.auth.Member;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonStep;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
public class LessonDetailRes {
    private int lessonId;
    private String lessonTitle;
    private String cookyerId;
    private String cookyerName;
    private int categoryId;
    private String categoryName;
    private String description;
    private int remaining;
    private int maximum;
    private int price;
    private List<String> materials;
    private String lessonDate;
    private float reviewAvg;
    private List<Member> lessonParticipantList;
    private String videoUrl;
    private String thumbnailUrl;
    private List<LessonStep> lessonStepList;
    private int jjimCount;
    private String createdDate;
    private String modifiedDate;

    public LessonDetailRes(Lesson lesson){
        this.lessonId = lesson.getLessonId();
        this.lessonTitle = lesson.getLessonTitle();
        this.cookyerId = lesson.getCookyerId();
        this.cookyerName = lesson.getCookyerName();
        this.categoryId = lesson.getLessonCategory().getCategoryId();
        this.description = lesson.getDescription();
        this.maximum = lesson.getMaximum();
        this.price = lesson.getPrice();
        this.materials = Arrays.asList(lesson.getMaterials().split(","));
        this.lessonDate = lesson.getLessonDate();
        this.videoUrl = lesson.getVideoUrl();
        this.thumbnailUrl = lesson.getThumbnailUrl();
        this.jjimCount = lesson.getJjimCount();
        this.createdDate = lesson.getCreatedDate().toString();
        this.modifiedDate = lesson.getModifiedDate().toString();
    }
}