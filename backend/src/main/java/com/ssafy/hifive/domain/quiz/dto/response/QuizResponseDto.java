package com.ssafy.hifive.domain.quiz.dto.response;

import com.ssafy.hifive.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class QuizResponseDto {
	private long id;
	private String problem;
	private boolean answer;
	private String detail;
	private int sequence;

	public static QuizResponseDto from(final Quiz quiz) {
		return new QuizResponseDto(
			quiz.getQuizId(),
			quiz.getProblem(),
			quiz.isAnswer(),
			quiz.getDetail(),
			quiz.getSequence()
		);
	}
}
