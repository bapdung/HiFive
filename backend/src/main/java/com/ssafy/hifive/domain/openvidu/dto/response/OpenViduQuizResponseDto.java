package com.ssafy.hifive.domain.openvidu.dto.response;

import com.ssafy.hifive.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduQuizResponseDto {
	private int sequence;
	private String problem;
	private boolean answer;
	private String detail;

	public static OpenViduQuizResponseDto from(Quiz quiz) {
		return new OpenViduQuizResponseDto(
			quiz.getSequence(),
			quiz.getProblem(),
			quiz.isAnswer(),
			quiz.getDetail()
		);
	}
}
