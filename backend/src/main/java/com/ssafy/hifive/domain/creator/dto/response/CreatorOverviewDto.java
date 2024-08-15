package com.ssafy.hifive.domain.creator.dto.response;

import com.ssafy.hifive.domain.creator.entity.Creator;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class CreatorOverviewDto {
	private long creatorId;
	private String creatorName;
	private String profileImg;

	public static CreatorOverviewDto from(Creator creator) {
		return new CreatorOverviewDto(
			creator.getCreator().getMemberId(),
			creator.getCreatorName(),
			creator.getCreatorImg()
		);
	}
}
