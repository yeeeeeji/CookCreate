package com.mmt.service.impl;

import com.mmt.domain.entity.auth.Member;
import com.mmt.domain.entity.chat.Chat;
import com.mmt.domain.entity.chat.Type;
import com.mmt.domain.entity.lesson.Lesson;
import com.mmt.domain.entity.lesson.LessonParticipant;
import com.mmt.domain.request.chat.ChatSaveReq;
import com.mmt.domain.response.chat.ChatRes;
import com.mmt.domain.response.chat.ChatRoomRes;
import com.mmt.repository.ChatRepository;
import com.mmt.repository.MemberRepository;
import com.mmt.repository.lesson.LessonParticipantRepository;
import com.mmt.repository.lesson.LessonRepository;
import com.mmt.service.ChatService;
import lombok.RequiredArgsConstructor;
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
    public void closeChatRoom(int lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId).get();
        lesson.setIsChatRoomOver(true);
        lessonRepository.save(lesson);
    }

    @Override
    public List<ChatRes> getChatMessageList(int lessenId) {
        List<Chat> messageList = lessonRepository.findByLessonId(lessenId).get().getChatList();
        List<ChatRes> result = new ArrayList<>();

        for(Chat chat : messageList) {
            ChatRes chatRes = new ChatRes(chat);
            Member member = chat.getMember();
            chatRes.setUserId(member.getUserId());
            chatRes.setNickname(member.getNickname());

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

            Chat chat = chatRepository.findByLesson_LessonIdOrderByCreatedDateDesc(lesson.getLessonId()).get();

            chatRoomRes.setLeastContent(chat.getContent());
            chatRoomRes.setLestCreateTime(chat.getCreatedDate().toString());

            result.add(chatRoomRes);
        }

        return result;
    }
}
