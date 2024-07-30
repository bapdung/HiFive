package com.ssafy.hifive.domain.quiz.dto.request;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.quiz.entity.Quiz;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class QuizRequestDto {
	private String problem;
	private boolean answer;
	private String detail;
	private int sequence;

	public Quiz toEntity(Fanmeeting fanmeeting) {
		return Quiz.builder()
			.fanmeeting(fanmeeting)
			.problem(problem)
			.answer(answer)
			.detail(detail)
			.sequence(sequence)
			.build();
	}

}
