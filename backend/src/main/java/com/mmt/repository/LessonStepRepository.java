package com.mmt.repository;

import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonStep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonStepRepository extends JpaRepository<LessonStep, Integer> {
}
