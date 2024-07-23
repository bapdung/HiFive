package com.ssafy.hifive.domain.point.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointParam {
	@Schema(description = "transaction Month", defaultValue = "current month", allowableValues = {
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
	})
	public int requestMonth;
}
