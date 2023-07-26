package com.mmt.repository.lesson;

import com.mmt.domain.entity.lesson.LessonParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonParticipantRepository extends JpaRepository<LessonParticipant, Integer> {
    List<LessonParticipant> findByLesson_LessonId(int lessonId);
}
