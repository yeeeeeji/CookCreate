package com.mmt.service.impl;

import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.response.lesson.MyLessonAppliedRes;
import com.mmt.repository.lesson.LessonParticipantRepository;
import com.mmt.repository.lesson.LessonRepository;
import com.mmt.service.MyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyServiceImpl implements MyService {

    private final LessonRepository lessonRepository;
    private final LessonParticipantRepository lessonParticipantRepository;

    @Override
    public List<MyLessonAppliedRes> getLessonApplied(String userId) {
        List<MyLessonAppliedRes> result = new ArrayList<>();

        // 신청한 과외가 있는지 확인
        List<LessonParticipant> lessonParticipantList = getParticipant(userId);
        if(lessonParticipantList.size() == 0){
            MyLessonAppliedRes myLessonAppliedRes = new MyLessonAppliedRes();
            myLessonAppliedRes.setStatusCode(HttpStatus.OK);
            myLessonAppliedRes.setMessage("신청한 과외가 없습니다.");
            result.add(myLessonAppliedRes);
            return result;
        }

        // 신청한 과외 중 이미 시작한 과외가 있는지 확인
        for(int i=lessonParticipantList.size()-1; i>=0; i--){
            if(lessonParticipantList.get(i).isCompleted()){
                lessonParticipantList.remove(i);
            }
        }
        if(lessonParticipantList.size() == 0){
            MyLessonAppliedRes myLessonAppliedRes = new MyLessonAppliedRes();
            myLessonAppliedRes.setStatusCode(HttpStatus.OK);
            myLessonAppliedRes.setMessage("신청한 과외가 없습니다.");
            result.add(myLessonAppliedRes);
            return result;
        }

        // 하나씩 세팅해서 결과값에 추가하기
        for(LessonParticipant lessonParticipant : lessonParticipantList){
            MyLessonAppliedRes myLessonAppliedRes = new MyLessonAppliedRes(lessonParticipant.getLesson());

            // 참여 신청한 날짜와 마지막 수정 날짜 세팅
            myLessonAppliedRes.setCreatedDate(lessonParticipant.getCreatedDate().toString());
            myLessonAppliedRes.setModifiedDate(lessonParticipant.getModifiedDate().toString());

            // 해당 과외의 참여자 수를 불러와서 remaining 세팅
            int lessonId = lessonParticipant.getLesson().getLessonId();
            int cnt = getParticipant(lessonId);
            myLessonAppliedRes.setRemaining(lessonParticipant.getLesson().getMaximum() - cnt + 1);

            // status 세팅
            myLessonAppliedRes.setStatusCode(HttpStatus.OK);
            myLessonAppliedRes.setMessage("Success");

            result.add(myLessonAppliedRes);
        }

        return result;
    }

    private List<LessonParticipant> getParticipant(String userId){
        // 사용자가 참여한 과외 목록 불러오기
        return lessonParticipantRepository.findAllByUserId(userId);
    }

    private int getParticipant(int lessonId){
        // 해당 과외의 참여자 수 불러오기
        return lessonParticipantRepository.findAllByLesson_LessonId(lessonId).size();
    }
}
