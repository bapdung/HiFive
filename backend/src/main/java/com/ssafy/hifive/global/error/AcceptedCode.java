package com.ssafy.hifive.global.error;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public enum AcceptedCode {

	/**
	 * Nickname
	 */
	NICKNAME_LENGTH(ACCEPTED, "MEMBER-002", "닉네임은 최소 2글자에서 최대 10글자 이내여야 합니다."),
	NICKNAME_SPECIAL_SYMBOL(ACCEPTED, "MEMBER-003", "닉네임에 특수문자를 포함할 수 없습니다."),
	NICKNAME_DUPLICATE(ACCEPTED, "MEMBER-004", "중복되는 닉네임이 존재합니다.");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

	AcceptedCode(final HttpStatus httpStatus, final String code, final String message) {
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
	}
}
