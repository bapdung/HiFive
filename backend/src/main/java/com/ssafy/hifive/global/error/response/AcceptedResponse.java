package com.ssafy.hifive.global.error.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AcceptedResponse {
	private String acceptedCode;
	private String acceptedMessage;

	public static AcceptedResponse of(String acceptedCode, String acceptedMessage) {
		return AcceptedResponse.builder()
			.acceptedCode(acceptedCode)
			.acceptedMessage(acceptedMessage)
			.build();
	}
}
