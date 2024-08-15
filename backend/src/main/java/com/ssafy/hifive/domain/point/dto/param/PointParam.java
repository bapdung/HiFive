package com.ssafy.hifive.domain.point.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointParam {
	@Schema(description = "최근 n달 조회", allowableValues = {
		"3", "6", "12"
	})
	public Integer period;

	@Schema(description = "페이지")
	private Integer page;
}
