package com.ssafy.hifive.domain.story.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.story.dto.param.StoryParam;
import com.ssafy.hifive.domain.story.dto.request.StoryRequestDto;
import com.ssafy.hifive.domain.story.dto.response.StoryDetailDto;
import com.ssafy.hifive.domain.story.dto.response.StoryOverviewDto;
import com.ssafy.hifive.domain.story.service.StoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/story")
@RequiredArgsConstructor
@Tag(name = "story", description = "사연 관련 API")
public class StoryController {

	private final StoryService storyService;

	@Operation(summary = "사연 생성", description = "특정 팬미팅에 대한 사연을 생성한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createStory(@PathVariable long fanmeetingId,
		@RequestBody StoryRequestDto storyRequestDto, @AuthenticationPrincipal Member member) {
		storyService.createStory(fanmeetingId, storyRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "사연 목록 조회", description = "특정 팬미팅의 모든 사연 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StoryOverviewDto>> getStoryAll(@PathVariable long fanmeetingId,
		@ModelAttribute StoryParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(storyService.getStoryAll(fanmeetingId, param, member));
	}

	@Operation(summary = "선택된 사연 조회", description = "특정 팬미팅에서 선택된 사연 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}/selected", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StoryOverviewDto>> getStorySelected(@PathVariable long fanmeetingId,
		@ModelAttribute StoryParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(storyService.getStorySelected(fanmeetingId, param, member));
	}

	@Operation(summary = "미선택된 사연 조회", description = "특정 팬미팅에서 미선택된 사연 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}/unselected", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StoryOverviewDto>> getStoryUnselected(@PathVariable long fanmeetingId,
		@ModelAttribute StoryParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(storyService.getStoryUnselected(fanmeetingId, param, member));
	}

	@Operation(summary = "사연 선택/비선택 토글", description = "사연을 선택하거나 비선택으로 변경한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PatchMapping(path = "/{storyId}/toggle")
	public ResponseEntity<Void> toggleStory(@PathVariable long storyId) {
		storyService.toggleStory(storyId);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "사연 상세 조회", description = "특정 사연을 상세 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/detail/{storyId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<StoryDetailDto> getStoryDetail(@PathVariable long storyId,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(storyService.getStoryDetail(storyId, member));
	}

	@Operation(summary = "내가 작성한 사연 목록 조회", description = "내가 작성한 사연 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/my/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StoryOverviewDto>> getMyStory(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(storyService.getMyStory(fanmeetingId, member));
	}

	@Operation(summary = "내가 작성한 사연 수정", description = "내가 작성한 사연을 수정한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PatchMapping(path = "/{storyId}")
	public ResponseEntity<Void> updateStory(@PathVariable long storyId,
		@RequestBody StoryRequestDto storyRequestDto, @AuthenticationPrincipal Member member) {
		storyService.updateStory(storyId, storyRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "내가 작성한 사연 삭제", description = "내가 작성한 사연을 삭제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(path = "/{storyId}")
	public ResponseEntity<Void> deleteStory(@PathVariable long storyId, @AuthenticationPrincipal Member member) {
		storyService.deleteStory(storyId, member);
		return ResponseEntity.ok().build();
	}
}
