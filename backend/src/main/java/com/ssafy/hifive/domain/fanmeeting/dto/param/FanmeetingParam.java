package com.ssafy.hifive.domain.fanmeeting.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FanmeetingParam {

	@Schema(description = "정렬 기준", defaultValue = "desc", allowableValues = {
		"asc",
		"desc"})
	public String sort;

	@Schema(description = "가장 나중에 불러온 것의 id")
	public Long top;

	@Schema(description = "조회할 크리에이터 이름")
	public String name;
}
