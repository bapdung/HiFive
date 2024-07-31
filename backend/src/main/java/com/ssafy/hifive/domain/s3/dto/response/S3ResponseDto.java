package com.ssafy.hifive.domain.s3.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record S3ResponseDto(
	@Schema(description = "제공되는 presigned-url") String path) {
	public static S3ResponseDto from(String fileName) {
		return new S3ResponseDto(fileName);
	}
}
