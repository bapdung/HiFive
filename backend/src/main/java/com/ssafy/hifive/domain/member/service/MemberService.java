package com.ssafy.hifive.domain.member.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new IllegalArgumentException("User Not Found"));
	}

	public Member findById(Member member) {
		return memberRepository.findById(member.getMemberId())
			.orElseThrow(() -> new RuntimeException("User Not Found"));
	}
}
