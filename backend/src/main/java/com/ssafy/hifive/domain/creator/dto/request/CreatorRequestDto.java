package com.ssafy.hifive.domain.creator.dto.request;

import com.ssafy.hifive.domain.creator.entity.Creator;
import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class CreatorRequestDto {
	private String link;
	private String description;

	public Creator toEntity(Member creator) {
		return Creator.builder()
			.creator(creator)
			.link(link)
			.description(description)
			.build();
	}
}
