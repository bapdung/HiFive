package com.ssafy.hifive.domain.question.dto.response;

import com.ssafy.hifive.domain.question.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionResponseDto {
	private long questionId;
	private String nickname;
	private String contents;
	private boolean isPicked;

	public static QuestionResponseDto from(Question question) {
		return new QuestionResponseDto(
			question.getQuestionId(),
			question.getFan().getNickname(),
			question.getContent(),
			question.isPicked()
		);
	}
}
