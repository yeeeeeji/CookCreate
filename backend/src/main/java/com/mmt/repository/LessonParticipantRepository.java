package com.mmt.repository;

import com.mmt.domain.entity.lesson.LessonParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonParticipantRepository extends JpaRepository<LessonParticipant, Integer> {
}
