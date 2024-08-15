package com.ssafy.hifive.domain.question.dto.response;

import com.ssafy.hifive.domain.question.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class QuestionResponseDto {
	private long questionId;
	private String nickname;
	private String contents;
	private boolean isPicked;
	private int totalPages;

	public static QuestionResponseDto from(Question question, int totalPages) {
		return new QuestionResponseDto(
			question.getQuestionId(),
			question.getFan().getNickname(),
			question.getContent(),
			question.isPicked(),
			totalPages

		);
	}
}
