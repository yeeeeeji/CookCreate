package com.mmt.repository;

import com.mmt.domain.entity.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Optional<Chat> findByLesson_LessonIdOrderByCreatedDateDesc(int lessonId);
}
