package com.ssafy.hifive.domain.question.dto.request;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.question.entity.Question;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class QuestionRequestDto {
	private String contents;

	public Question toEntity(Fanmeeting fanmeeting, Member fan) {
		return Question.builder()
			.fan(fan)
			.fanmeeting(fanmeeting)
			.content(contents)
			.build();
	}
}
