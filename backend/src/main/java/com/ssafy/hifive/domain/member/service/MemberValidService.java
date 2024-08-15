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

	private void validateLength(String input, AcceptedCode lengthCode) {
		if (input.length() < 2 || input.length() > 10) {
			throw new AcceptedException(lengthCode);
		}
	}

	private void validateSpecialSymbols(String input, AcceptedCode specialSymbolCode) {
		String regex = "[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(input);
		boolean isInvalid = matcher.find();
		if (isInvalid) {
			throw new AcceptedException(specialSymbolCode);
		}
	}

	private void validateDuplicate(String input, AcceptedCode duplicateCode) {
		boolean isDuplicate = memberRepository.existsByNickname(input);
		if (isDuplicate) {
			throw new AcceptedException(duplicateCode);
		}
	}

	public void validateNickname(String nickname) {
		validateLength(nickname, AcceptedCode.NICKNAME_LENGTH);
		validateSpecialSymbols(nickname, AcceptedCode.NICKNAME_SPECIAL_SYMBOL);
		validateDuplicate(nickname, AcceptedCode.NICKNAME_DUPLICATE);
	}

	public void validateName(String name) {
		validateLength(name, AcceptedCode.NAME_LENGTH);
		validateSpecialSymbols(name, AcceptedCode.NAME_SPECIAL_SYMBOL);
	}
}
