package com.mmt.service.impl;

import com.mmt.domain.entity.Member;
import com.mmt.domain.request.UserSignUpReq;
import com.mmt.repository.MemberRepository;
import com.mmt.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public Member signUp(UserSignUpReq userInfo) throws Exception {

        Member member = new Member();

        member.setUserId(userInfo.getId());
        member.setUserPw(passwordEncoder.encode(userInfo.getPassword()));

        return memberRepository.save(member);
    }
}
