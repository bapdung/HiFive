package com.ssafy.hifive.global.error.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {
	private String errorCode;
	private String errorMessage;

	public static ErrorResponse of(String errorCode, String errorMessage) {
		return ErrorResponse.builder()
			.errorCode(errorCode)
			.errorMessage(errorMessage)
			.build();
	}
}
