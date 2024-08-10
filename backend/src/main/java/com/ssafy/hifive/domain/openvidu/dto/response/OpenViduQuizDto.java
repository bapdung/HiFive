package com.ssafy.hifive.domain.openvidu.dto.response;

import com.ssafy.hifive.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public final class OpenViduQuizDto {
	private String problem;
	private boolean answer;
	private int totalQuizCount;
	private String detail;

	public static OpenViduQuizDto from(Quiz quiz, int totalQuizCount) {
		return new OpenViduQuizDto(
			quiz.getProblem(),
			quiz.isAnswer(),
			totalQuizCount,
			quiz.getDetail()
		);
	}
}