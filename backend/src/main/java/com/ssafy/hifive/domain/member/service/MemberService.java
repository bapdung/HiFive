package com.ssafy.hifive.domain.member.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.dto.request.MemberIdentificationDto;
import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.request.MemberUpdateDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final MemberValidService memberValidService;

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
	}

	public MemberResponseDto getMemberDetail(Member member) {
		return MemberResponseDto.from(member);
	}

	public void checkNickName(MemberNicknameDto memberNicknameDto) {
		memberValidService.isValidNicknameLength(memberNicknameDto.getNickname());
		memberValidService.isValidNicknameSpecailSymbol(memberNicknameDto.getNickname());
		memberValidService.isValidDuplicate(memberNicknameDto.getNickname());
	}

	@Transactional
	public void updateMember(MemberUpdateDto memberUpdateDto, Member member) {
		member.updateMember(memberUpdateDto.getProfileImg(), memberUpdateDto.getNickname());
		memberRepository.save(member);
	}

	@Transactional
	public void createIdentification(MemberIdentificationDto memberIdentificationDto, Member member) {
		member.updateIdentification(memberIdentificationDto.getIdentificationImg());
	}

	@Transactional
	public void deleteMember(Member member) {
		member.deleteMember();
		memberRepository.save(member);
	}
}
