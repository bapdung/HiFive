package com.ssafy.hifive.domain.story.dto.response;

import com.ssafy.hifive.domain.story.entity.Story;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class StoryOverviewDto {
	private long storyId;
	private String nickname;
	private String title;
	private boolean isPicked;

	public static StoryOverviewDto from(Story story) {
		return new StoryOverviewDto(
			story.getStoryId(),
			story.getFan().getNickname(),
			story.getTitle(),
			story.isPicked()
		);
	}
}
