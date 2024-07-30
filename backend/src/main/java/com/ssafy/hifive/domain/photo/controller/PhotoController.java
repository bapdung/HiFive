package com.ssafy.hifive.domain.photo.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.photo.dto.response.PhotoOverViewDto;
import com.ssafy.hifive.domain.photo.service.PhotoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/photo")
@RequiredArgsConstructor
@Tag(name = "photo", description = "팬미팅 사진 관련 API")
public class PhotoController {

	private final PhotoService photoService;

	@Operation(summary = "사진 조회", description = "팬미팅에서 찍은 사진을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PhotoOverViewDto>> getPhotosByFanmeeting(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {

		return ResponseEntity.ok(photoService.getPhotosByFanmeeting(fanmeetingId, member));
	}

}
