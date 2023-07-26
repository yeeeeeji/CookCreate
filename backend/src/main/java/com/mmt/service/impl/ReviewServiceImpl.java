package com.mmt.service.impl;

import com.mmt.domain.entity.Auth.Member;
import com.mmt.domain.entity.Review;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.request.ReviewPostReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.repository.MemberRepository;
import com.mmt.repository.ReviewRepository;
import com.mmt.repository.lesson.LessonParticipantRepository;
import com.mmt.repository.lesson.LessonRepository;
import com.mmt.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final LessonRepository lessonRepository;
    private final LessonParticipantRepository lessonParticipantRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseDto register(ReviewPostReq reviewPostReq) {
        // 존재하는 과외인지 확인
        Optional<Lesson> lesson = lessonRepository.findByLessonId(reviewPostReq.getLessonId());
        if(lesson.isEmpty()){
            return new ResponseDto(HttpStatus.NOT_FOUND, "존재하지 않는 과외입니다.");
        }

        // 신청한 사용자인지 확인
        Optional<LessonParticipant> lessonParticipant = lessonParticipantRepository.findByLesson_LessonIdAndUserId(reviewPostReq.getLessonId(), reviewPostReq.getUserId());
        if(lessonParticipant.isEmpty()){
            return new ResponseDto(HttpStatus.FORBIDDEN, "수강한 Cookiee만 이용 가능합니다");
        }

        Review review = new Review(reviewPostReq);
        review.setLesson(lesson.get());
        Optional<Member> member = memberRepository.findByUserId(reviewPostReq.getUserId());
        review.setMember(member.get());

        reviewRepository.save(review);

        return new ResponseDto(HttpStatus.CREATED, "Success");
    }
}
