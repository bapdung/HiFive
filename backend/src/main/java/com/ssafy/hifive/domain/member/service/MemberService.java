package com.ssafy.hifive.domain.member.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;

@Service
public class MemberService {
	public ResponseEntity<MemberResponseDto> getMemberDetail(Member member) {
		return ResponseEntity.ok(null);
	}

	public void nicknameCheck(MemberNicknameDto memberNicknameDto, Member member) {
		return;
	}
}
