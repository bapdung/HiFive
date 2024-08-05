package com.ssafy.hifive.domain.creator.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.creator.entity.Creator;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class CreatorDetailDto {
	private long creatorId;
	private String creatorName;
	private String link;
	private String description;
	private long follower;
	private long boardCount;
	private LocalDateTime createdDate;
	private long fanmeetingCount;

	public static CreatorDetailDto from(Creator creator, long boardCount, long fanmeetingCount) {
		return new CreatorDetailDto(
			creator.getCreator().getMemberId(),
			creator.getCreatorName(),
			creator.getLink(),
			creator.getDescription(),
			creator.getFollower(),
			boardCount,
			creator.getCreatedDate(),
			fanmeetingCount
		);
	}
}
