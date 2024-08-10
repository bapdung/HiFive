package com.ssafy.hifive.domain.openvidu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduQuizResultDto {
	private long fanId;
	private int score;

	public static OpenViduQuizResultDto from(long fanId, int score) {
		return new OpenViduQuizResultDto(
			fanId,
			score
		);
	}
}
