package com.ssafy.hifive.domain.member.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.global.error.AcceptedCode;
import com.ssafy.hifive.global.error.type.AcceptedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberValidService {
	private final MemberRepository memberRepository;

	public void isValidNicknameLength(String nickname) {
		if (nickname.length() < 2 || nickname.length() > 10)
			throw new AcceptedException(AcceptedCode.NICKNAME_LENGTH);
	}

	public void isValidNicknameSpecailSymbol(String nickname) {
		String regex = "[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(nickname);
		boolean isInvaild = matcher.find();
		if (isInvaild) {
			throw new AcceptedException(AcceptedCode.NICKNAME_SPECIAL_SYMBOL);
		}
	}

	public void isValidDuplicate(String nickname) {
		boolean isDuplicate = memberRepository.existsByNickname(nickname);

		if (isDuplicate) {
			throw new AcceptedException(AcceptedCode.NICKNAME_DUPLICATE);
		}
	}
}
