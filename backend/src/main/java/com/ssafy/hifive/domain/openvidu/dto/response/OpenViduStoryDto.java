package com.ssafy.hifive.domain.openvidu.dto.response;

import com.ssafy.hifive.domain.story.entity.Story;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public final class OpenViduStoryDto {
	private String nickname;
	private String title;
	private String content;
	private int totalStoryCount;

	public static OpenViduStoryDto from(Story story, int totalStoryCount) {
		return new OpenViduStoryDto(
			story.getFan().getNickname(),
			story.getTitle(),
			story.getContent(),
			totalStoryCount
		);
	}
}