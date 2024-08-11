package com.ssafy.hifive.domain.openvidu.dto.response;

import com.ssafy.hifive.domain.question.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public final class OpenViduQuestionDto {
	private long questionId;
	private String nickname;
	private String content;
	private int totalQuestionCount;

	public static OpenViduQuestionDto from(Question question, int totalQuestionCount) {
		return new OpenViduQuestionDto(
			question.getQuestionId(),
			question.getFan().getNickname(),
			question.getContent(),
			totalQuestionCount
		);
	}
}
