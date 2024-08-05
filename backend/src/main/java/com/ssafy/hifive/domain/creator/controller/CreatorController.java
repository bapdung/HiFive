package com.ssafy.hifive.domain.creator.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.creator.dto.param.CreatorParam;
import com.ssafy.hifive.domain.creator.dto.request.CreatorRequestDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorDetailDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorOverviewDto;
import com.ssafy.hifive.domain.creator.service.CreatorService;
import com.ssafy.hifive.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/creator")
@RequiredArgsConstructor
@Tag(name = "creator", description = "크리에이터 프로필 관련 API")
public class CreatorController {
	private final CreatorService creatorService;

	@Operation(summary = "크리에이터 기준 전체 크리에이터 조회", description = "정렬을 바탕으로 전체 크리에이터를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CreatorOverviewDto>> getCreatorAll(
		@ModelAttribute CreatorParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(creatorService.getCreatorAll(param));
	}

	@Operation(summary = "내가 팔로우한 크리에이터 프로필 전체 조회", description = "내가 팔로우한 크리에이터 프로필을 전체 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/follow", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CreatorOverviewDto>> getCreatorFollow(
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(creatorService.getCreatorFollow(member));
	}

	@Operation(summary = "메인페이지 크리에이터 조회", description = "메인화면에 표시될 크리에이터 20명을 불러온다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/main", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CreatorOverviewDto>> getCreatorMain(
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(creatorService.getTopCreators());
	}

	@Operation(summary = "크리에이터 프로필 상세 조회", description = "내가 팔로우한 크리에이터 프로필 상세 내용을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CreatorDetailDto> getCreatorDetail(
		@PathVariable long creatorId, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(creatorService.getCreatorDetail(creatorId, member));
	}

	@Operation(summary = "크리에이터 프로필 생성", description = "이메일로 받은 정보를 바탕으로 관리자가 크리에이터 프로필 생성해준다")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createCreator(
		@RequestBody CreatorRequestDto creatorRequestDto,
		@AuthenticationPrincipal Member member) {
		creatorService.createCreator(creatorRequestDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@Operation(summary = "크리에이터 프로필 수정", description = "크리에이터 프로필을 수정한다")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PatchMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateCreator(@RequestBody CreatorRequestDto creatorRequestDto,
		@AuthenticationPrincipal Member member) {

		creatorService.updateCreator(creatorRequestDto, member);
		return ResponseEntity.ok().build();
	}
}
