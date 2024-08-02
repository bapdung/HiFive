package com.ssafy.hifive.domain.s3.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.s3.dto.request.S3RequestDto;
import com.ssafy.hifive.domain.s3.dto.response.S3ResponseDto;
import com.ssafy.hifive.domain.s3.service.S3Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "files", description = "s3 presigned-url 받아오기")
@RestController
@RequestMapping("/api/s3")
@Slf4j
@RequiredArgsConstructor
public class S3Controller {
	private final S3Service s3Service;

	@Operation(summary = "이미지 업로드를 위한 presigned-url 발급")
	@ApiResponse(responseCode = "401", description = "세션이 존재하지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\": \"세션이 존재하지 않습니다.\"}")))
	@PostMapping("/upload/{fileName}")
	@ResponseStatus(HttpStatus.OK)
	S3ResponseDto createPresignedUrl(@RequestBody S3RequestDto s3RequestDto, @PathVariable String fileName,
		@AuthenticationPrincipal Member member) {
		return s3Service.createPresignedUrl(s3RequestDto, fileName, member);
	}
}