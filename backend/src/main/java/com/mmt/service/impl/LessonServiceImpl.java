package com.mmt.service.impl;

import com.mmt.domain.entity.Auth.Member;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonCategory;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.entity.lesson.LessonStep;
import com.mmt.domain.request.LessonPostReq;
import com.mmt.domain.response.LessonDetailRes;
import com.mmt.domain.response.LessonLatestRes;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.*;
import com.mmt.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final LessonCategoryRepository lessonCategoryRepository;
    private final LessonParticipantRepository lessonParticipantRepository;
    private final LessonStepRepository lessonStepRepository;
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

        // TODO: 채팅방 생성

        return new ResponseDto(HttpStatus.CREATED, "Success");
    }

    @Override
    public LessonDetailRes getLessonDetail(int lessonId) {
        Optional<Lesson> lesson = lessonRepository.findByLessonId(lessonId);
        LessonDetailRes result = new LessonDetailRes();
        if(lesson.isPresent()) {
            result = new LessonDetailRes(lesson.get());

            // categoryName 세팅
            Optional<LessonCategory> lessonCategory = lessonCategoryRepository.findById(lesson.get().getLessonCategory().getCategoryId());
            if(lessonCategory.isPresent()) result.setCategoryName(lessonCategory.get().getCategoryTitle());

            // lessonParticipantList 세팅
            List<LessonParticipant> lessonParticipantList = lessonParticipantRepository.findByLesson_LessonId(lessonId);
            List<Member> memberList = new ArrayList<>();
            for (LessonParticipant lp : lessonParticipantList){
                Member member = new Member();
                String userId = lp.getUserId();
                member.setUserId(userId);
                member.setNickname(memberRepository.findByUserId(userId).get().getNickname());
                memberList.add(member);
            }
            result.setLessonParticipantList(memberList);

            // remaining 세팅
            result.setRemaining(result.getMaximum() - lessonParticipantList.size() + 1);

            // lessonStepList 세팅
            List<LessonStep> lessonStepList = lessonStepRepository.findByLesson_LessonId(lessonId);
            result.setLessonStepList(lessonStepList);

            // TODO: reviewAvg 세팅 -> review 기능 구현 후
        }

        return result;
    }

    @Override
    public LessonLatestRes getLessonLatest(String userId) {
        LessonLatestRes lessonLatestRes = new LessonLatestRes();
        List<Lesson> lessonList = lessonRepository.findAllByCookyerId(userId, Sort.by(Sort.Direction.DESC, "createdDate"));

        if(lessonList.size() == 0){
            lessonLatestRes.setStatusCode(HttpStatus.NOT_FOUND);
            lessonLatestRes.setMessage("이전에 예약한 화상 과외 내역이 없습니다.");
        }else{
            lessonLatestRes = new LessonLatestRes(lessonList.get(0));
            lessonLatestRes.setStatusCode(HttpStatus.OK);
            lessonLatestRes.setMessage("Success");
        }

        return lessonLatestRes;
    }
}
