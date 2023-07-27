package com.mmt.repository.lesson;

import com.mmt.domain.entity.lesson.LessonParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonParticipantRepository extends JpaRepository<LessonParticipant, Integer> {
    List<LessonParticipant> findAllByLesson_LessonId(int lessonId);
    List<LessonParticipant> findAllByUserId(String userId);
    Optional<LessonParticipant> findByLesson_LessonIdAndUserId(int lessonId, String userId);
}
