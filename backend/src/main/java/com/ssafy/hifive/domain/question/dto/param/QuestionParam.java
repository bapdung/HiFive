package com.ssafy.hifive.domain.question.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;

public class QuestionParam {
	@Schema(description = "정렬 기준", defaultValue = "desc", allowableValues = {
		"asc",
		"desc"})
	public String sort;
	@Schema(description = "페이지")
	public Integer page;
}
