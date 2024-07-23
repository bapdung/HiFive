package com.ssafy.hifive.domain.creator.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreatorParam {

	@Schema(description = "검색할 크리에이터의 이름")
	private String name;

	@Schema(description = "정렬 조건", defaultValue = "creator name", allowableValues = {
		"createdDate",
		"creatorName"
	})
	public String condition;

	@Schema(description = "정렬 기준", defaultValue = "create date", allowableValues = {
		"asc",
		"desc"
	})
	public String sort;

	@Schema(description = "가져올 항목의 상위 N개")
	public String top;
}
