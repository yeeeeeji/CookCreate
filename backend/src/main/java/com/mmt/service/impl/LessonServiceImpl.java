package com.mmt.service.impl;

import com.mmt.domain.entity.Member;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonCategory;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.entity.lesson.LessonStep;
import com.mmt.domain.request.LessonPostReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.*;
import com.mmt.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final LessonStepRepository lessonStepRepository;
    private final LessonParticipantRepository lessonParticipantRepository;
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public ResponseDto reserve(LessonPostReq lessonPostReq) {
        Lesson lesson = new Lesson(lessonPostReq);

        // lesson에 카테고리 아이디 저장
        LessonCategory lessonCategory = new LessonCategory();
        lessonCategory.setCategoryId(lessonPostReq.getCategoryId());
        lesson.setLessonCategory(lessonCategory);

        // lesson에 cookyer 닉네임 저장
        Optional<Member> cookyer = memberRepository.findByUserId(lessonPostReq.getCookyerId());
        cookyer.ifPresent(member -> lesson.setCookyerName(member.getNickname()));

        Lesson save = lessonRepository.save(lesson);

        // 진행 단계에 lesson id 저장
        for(LessonStep lessonStep : save.getLessonStepList()){
            lessonStep.setLesson(save);
            lessonStepRepository.save(lessonStep);
        }

        // 참여자 목록에 lesson 세팅, 선생님 아이디 추가
        LessonParticipant lessonParticipant = new LessonParticipant();
        lessonParticipant.setLesson(save);
        lessonParticipant.setUserId(lessonPostReq.getCookyerId());
        lessonParticipant.setCompleted(false);
        lessonParticipantRepository.save(lessonParticipant);

        return new ResponseDto(HttpStatus.CREATED, "Success");
    }
}
