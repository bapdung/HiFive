package com.ssafy.hifive.domain.story.dto.response;

import com.ssafy.hifive.domain.story.entity.Story;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class StoryDetailDto {
	private String title;
	private String contents;
	private String nickname;
	private boolean isPicked;

	public static StoryDetailDto from(final Story story) {
		return new StoryDetailDto(
			story.getTitle(),
			story.getContents(),
			story.getFan().getNickname(),
			story.isPicked()
		);
	}
}
