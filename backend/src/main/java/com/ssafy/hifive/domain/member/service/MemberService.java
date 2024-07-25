package com.ssafy.hifive.domain.member.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.dto.request.MemberIdentificationDto;
import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.request.MemberUpdateDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new EntityNotFoundException("User Not Found"));
	}

	public MemberResponseDto getMemberDetail(Member member) {
		return memberRepository.findById(member.getMemberId())
			.map(MemberResponseDto::from)
			.orElseThrow(() -> new EntityNotFoundException("User Not Found"));
		// MemberResponseDto memberResponseDto = MemberResponseDto.from(user);
		// return ResponseEntity.ok(memberResponseDto);
	}

	public ResponseEntity<String> nicknameCheck(MemberNicknameDto memberNicknameDto, Member member) {

		if (memberNicknameDto.getNickname().length() < 2 || memberNicknameDto.getNickname().length() > 10) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("닉네임은 최소 2글자에서 최대 10글자 이내여야 합니다.");
		}

		String regex = "[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(memberNicknameDto.getNickname());
		boolean isInvaild = matcher.find();

		if (isInvaild) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("닉네임에 특수문자를 포함할 수 없습니다.");
		}

		boolean isDuplicate = memberRepository.existsByNickname(memberNicknameDto.getNickname());

		if (isDuplicate) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("중복되는 닉네임이 존재합니다.");
		}

		return ResponseEntity.ok("사용 가능한 닉네임입니다.");
	}

	public void updateMember(MemberUpdateDto updateMember, Member member) {
		Member user = memberRepository.findById(member.getMemberId())
			.orElseThrow(() -> new EntityNotFoundException("User Not Found"));
		user.updateMember(updateMember);
		memberRepository.save(user);
	}

	public void createIdentification(MemberIdentificationDto memberIdentificationDto, Member member) {
		Member user = memberRepository.findById(member.getMemberId())
			.orElseThrow(() -> new EntityNotFoundException("User Not Found"));
		user.createIdentification(memberIdentificationDto);
		memberRepository.save(user);
	}

	public void deleteMember(Member member) {
		memberRepository.deleteById(member.getMemberId());
	}
}
