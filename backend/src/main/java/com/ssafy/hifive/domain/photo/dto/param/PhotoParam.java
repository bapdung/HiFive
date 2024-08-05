package com.ssafy.hifive.domain.photo.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PhotoParam {

	@Schema(description = "정렬 기준", defaultValue = "desc", allowableValues = {
		"asc",
		"desc"})
	public String sort;
}
