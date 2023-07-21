package com.mmt.repository;

import com.mmt.domain.entity.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    Optional<Lesson> findByLessonId(int lessonId);
}
