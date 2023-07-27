package com.mmt.service.impl;

import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.response.lesson.MyLessonRes;
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
    public List<MyLessonRes> getMyLesson(String userId, boolean isCompleted) {
        List<MyLessonRes> result = new ArrayList<>();

        // 신청한 과외가 있는지 확인
        List<LessonParticipant> lessonParticipantList = getParticipant(userId);
        if(lessonParticipantList.size() == 0){
            MyLessonRes myLessonAppliedRes = new MyLessonRes();
            myLessonAppliedRes.setStatusCode(HttpStatus.OK);
            myLessonAppliedRes.setMessage("신청한 과외가 없습니다.");
            result.add(myLessonAppliedRes);
            return result;
        }

        // 신청한 과외 중 이미 시작한 과외가 있는지 확인
        List<LessonParticipant> list = getParticipant(lessonParticipantList, isCompleted);
        if(list.size() == 0){
            MyLessonRes myLessonRes = new MyLessonRes();
            myLessonRes.setStatusCode(HttpStatus.OK);
            myLessonRes.setMessage("신청한 과외가 없습니다.");
            result.add(myLessonRes);
            return result;
        }

        // 하나씩 세팅해서 결과값에 추가하기
        for(LessonParticipant lessonParticipant : lessonParticipantList){
            MyLessonRes myLessonRes = new MyLessonRes(lessonParticipant.getLesson());

            // 참여 신청한 날짜와 마지막 수정 날짜 세팅
            myLessonRes.setCreatedDate(lessonParticipant.getCreatedDate().toString());
            myLessonRes.setModifiedDate(lessonParticipant.getModifiedDate().toString());

            // 해당 과외의 참여자 수를 불러와서 remaining 세팅
            int lessonId = lessonParticipant.getLesson().getLessonId();
            int cnt = getParticipant(lessonId);
            myLessonRes.setRemaining(lessonParticipant.getLesson().getMaximum() - cnt + 1);

            // status 세팅
            myLessonRes.setStatusCode(HttpStatus.OK);
            myLessonRes.setMessage("Success");

            result.add(myLessonRes);
        }

        return result;
    }

    private List<LessonParticipant> getParticipant(List<LessonParticipant> list, boolean isCompleted){
        // 파라미터와 동일한 상태의 참여자 목록 반환
        for(int i=list.size()-1; i>=0; i--){
            if(list.get(i).isCompleted() != isCompleted){
                list.remove(i);
            }
        }
        return list;
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
