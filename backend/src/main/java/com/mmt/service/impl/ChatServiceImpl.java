package com.mmt.service.impl;

import com.mmt.domain.entity.auth.Member;
import com.mmt.domain.entity.chat.Chat;
import com.mmt.domain.entity.chat.Type;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.request.chat.ChatSaveReq;
import com.mmt.domain.response.ResponseDto;
import com.mmt.domain.response.chat.ChatRes;
import com.mmt.domain.response.chat.ChatRoomRes;
import com.mmt.repository.ChatRepository;
import com.mmt.repository.MemberRepository;
import com.mmt.repository.lesson.LessonParticipantRepository;
import com.mmt.repository.lesson.LessonRepository;
import com.mmt.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final LessonRepository lessonRepository;
    private final LessonParticipantRepository lessonParticipantRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    @Override
    public void saveMessage(ChatSaveReq message) {
        Lesson lesson = lessonRepository.findByLessonId(message.getLessonId()).get();
        Member member = memberRepository.findByUserId(message.getUserId()).get();
        Chat chat = Chat.builder()
                .member(member)
                .lesson(lesson)
                .content(message.getContent())
                .type(Type.ENTER)
                .build();

        chatRepository.save(chat);
    }

    @Override
    public ResponseDto closeChatRoom(int lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId).get();
        lesson.setIsChatRoomOver(true);
        lessonRepository.save(lesson);
        return new ResponseDto(HttpStatus.OK, "success");
    }

    @Override
    public ResponseDto leaveChatRoom(String userId, int lessonId) {
        LessonParticipant lessonParticipant = lessonParticipantRepository.findByLesson_LessonIdAndUserId(lessonId, userId).get();
        lessonParticipant.setLeaveChat(true);
        lessonParticipantRepository.save(lessonParticipant);
        return new ResponseDto(HttpStatus.OK, "success");
    }

    @Override
    public List<ChatRes> getChatMessageList(String userId, int lessenId) {
        List<ChatRes> result = new ArrayList<>();

        // TODO : 예외 처리
        LessonParticipant lessonParticipant = lessonParticipantRepository.findByLesson_LessonIdAndUserId(lessenId, userId).get();
        if(lessonParticipant == null || lessonParticipant.isLeaveChat()) {
            result.add(new ChatRes(HttpStatus.FORBIDDEN, "접근 권한이 없는 채팅방입니다."));
            return result;
        }

        List<Chat> messageList = lessonRepository.findByLessonId(lessenId).get().getChatList();

        for(Chat chat : messageList) {
            ChatRes chatRes = new ChatRes(chat);
            Member member = chat.getMember();
            chatRes.setUserId(member.getUserId());
            chatRes.setNickname(member.getNickname());
            chatRes.setStatusCode(HttpStatus.OK);
            chatRes.setMessage("sucess");

            result.add(chatRes);
        }

        return result;
    }

    @Override
    public List<ChatRoomRes> getChatRoomList(String userId) {
        List<LessonParticipant> lessonParticipantList = lessonParticipantRepository.findAllByUserIdAndIsLeaveChat(userId, false);
        List<ChatRoomRes> result = new ArrayList<>();

        for (LessonParticipant lessonParticipant : lessonParticipantList) {
            Lesson lesson = lessonParticipant.getLesson();
            ChatRoomRes chatRoomRes = new ChatRoomRes(lesson);

            Chat chat = chatRepository.findFirst1ByLesson_LessonIdOrderByCreatedDateDesc(lesson.getLessonId()).get();

            chatRoomRes.setLeastContent(chat.getContent());
            chatRoomRes.setLestCreateTime(chat.getCreatedDate().toString());
            chatRoomRes.setStatusCode(HttpStatus.OK);
            chatRoomRes.setMessage("sucess");

            result.add(chatRoomRes);
        }

        if(result.isEmpty()) {
            result.add(new ChatRoomRes(HttpStatus.OK, "참여 중인 채팅방이 없습니다."));
        }

        return result;
    }
}
