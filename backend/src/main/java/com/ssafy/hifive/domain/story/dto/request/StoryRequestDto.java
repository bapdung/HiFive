package com.ssafy.hifive.domain.story.dto.request;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.story.entity.Story;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class StoryRequestDto {
	private String title;
	private String contents;

	public Story toEntity(Member fan, Fanmeeting fanmeeting) {
		return Story.builder()
			.fanmeeting(fanmeeting)
			.fan(fan)
			.title(title)
			.contents(contents)
			.build();
	}
}
