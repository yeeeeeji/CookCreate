package com.mmt.repository.lesson;

import com.mmt.domain.entity.lesson.LessonParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonParticipantRepository extends JpaRepository<LessonParticipant, Integer> {
    List<LessonParticipant> findByLesson_LessonId(int lessonId);
    Optional<LessonParticipant> findByLesson_LessonIdAndUserId(int lessonId, String userId);
}
