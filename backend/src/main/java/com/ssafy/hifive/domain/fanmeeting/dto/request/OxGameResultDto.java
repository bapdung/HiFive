package com.ssafy.hifive.domain.fanmeeting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OxGameResultDto {
	private String sessionId;
	private int questionNum;
	private int score;
	private long memberId;
}
