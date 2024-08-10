package com.ssafy.hifive.domain.openvidu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduQuizResultSequenceDto {
	private long fanId;
	private boolean result;

	public static OpenViduQuizResultSequenceDto from(long fanId, boolean result) {
		return new OpenViduQuizResultSequenceDto(fanId, result);
	}

}
