package com.ssafy.hifive.domain.creator.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreatorParam {

	@Schema(description = "검색할 크리에이터의 이름")
	private String name;

	@Schema(description = "정렬 조건", defaultValue = "creatorName", allowableValues = {
		"createdDate",
		"creatorName"
	})
	public String condition;

	@Schema(description = "정렬 기준", defaultValue = "asc", allowableValues = {
		"asc",
		"desc"
	})
	public String sort;

	@Schema(description = "가장 마지막에 불러온 creator_id")
	public Long top;
}
