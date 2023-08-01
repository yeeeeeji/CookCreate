package com.mmt.domain.entity.lesson;

import com.mmt.domain.entity.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
// 과외 신청자/참여자
public class LessonParticipant extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lessonParticipantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    private String userId;
    private boolean isCompleted;
    private boolean isLeaveChat;
}