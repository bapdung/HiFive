package com.ssafy.hifive.domain.fanmeeting.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FanmeetingParam {

	@Schema(description = "정렬 기준", defaultValue = "create date", allowableValues = {
		"asc",
		"desc"})
	public String sort;

	@Schema(description = "가져올 항목의 상위 N개")
	public String top;
}
