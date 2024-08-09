package com.ssafy.hifive.domain.openvidu.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OpenViduQuizRequestDto {
	private String sessionId;
	private int questionNum;
	private int score;
	private long memberId;
}
