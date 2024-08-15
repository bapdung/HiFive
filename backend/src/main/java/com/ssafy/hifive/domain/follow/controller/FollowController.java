package com.ssafy.hifive.domain.follow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.follow.service.FollowService;
import com.ssafy.hifive.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
@Tag(name = "follow", description = "크리에이터 팔로우 관련 API")
public class FollowController {

	private final FollowService followService;

	@Operation(summary = "크리에이터 팔로우", description = "특정 크리에이터를 팔로우한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{creatorId}")
	public ResponseEntity<Void> followCreator(@PathVariable long creatorId, @AuthenticationPrincipal Member member) {
		followService.followCreator(creatorId, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "크리에이터 팔로우 취소", description = "특정 크리에이터에 대한 팔로우를 취소한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(path = "/{creatorId}")
	public ResponseEntity<Void> unfollowCreator(@PathVariable long creatorId, @AuthenticationPrincipal Member member) {
		followService.unfollowCreator(creatorId, member);
		return ResponseEntity.ok().build();
	}
}
