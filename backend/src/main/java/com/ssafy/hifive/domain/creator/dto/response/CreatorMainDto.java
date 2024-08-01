package com.ssafy.hifive.domain.creator.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreatorMainDto {
	private List<CreatorOverviewDto> follow;
	private List<CreatorOverviewDto> unfollow;
}
