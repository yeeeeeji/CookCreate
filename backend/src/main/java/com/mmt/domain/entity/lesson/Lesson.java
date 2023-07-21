package com.mmt.domain.entity.lesson;

import com.mmt.domain.entity.BaseTimeEntity;
import com.mmt.domain.request.LessonPostReq;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Lesson extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lessonId;
    private String lessonTitle;
    private String cookyerId;
    private String cookyerName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private LessonCategory lessonCategory;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<LessonParticipant> lessonParticipantList = new ArrayList<>();

    private String description;
    private int maximum;
    private int price;
    private String materials;
    private String lessonDate;
    private int jjimCount;
    private String videoUrl;
    private String thumbnailUrl;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<LessonStep> lessonStepList = new ArrayList<>();

    public Lesson(LessonPostReq lessonPostReq){
        this.lessonTitle = lessonPostReq.getLessonTitle();
        this.cookyerId = lessonPostReq.getCookyerId();
        this.description = lessonPostReq.getDescription();
        this.maximum = lessonPostReq.getMaximum();
        this.price = lessonPostReq.getPrice();
        this.materials = String.join(",", lessonPostReq.getMaterials());
        this.lessonDate = lessonPostReq.getLessonDate();
        this.videoUrl = lessonPostReq.getVideoUrl();
        this.thumbnailUrl = lessonPostReq.getThumbnailUrl();
        this.lessonStepList = lessonPostReq.getLessonStepList();
    }
}