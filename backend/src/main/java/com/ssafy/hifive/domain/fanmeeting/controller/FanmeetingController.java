package com.ssafy.hifive.domain.fanmeeting.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.fanmeeting.dto.request.FanmeetingRequestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingDetailDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingLatestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingOverViewDto;
import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingService;
import com.ssafy.hifive.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fanmeeting")
@RequiredArgsConstructor
@Tag(name = "fanmeeting", description = "팬미팅 관련 API")
public class FanmeetingController {

	private final FanmeetingService fanmeetingService;

	@Operation(summary = "팬미팅 방 생성", description = "팬미팅 방을 생성한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createFanmeeting(@RequestBody FanmeetingRequestDto fanmeetingRequestDto,
		@AuthenticationPrincipal Member member) {
		fanmeetingService.createFanmeeting(fanmeetingRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "팬미팅 방 수정", description = "팬미팅 방을 수정한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PutMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateFanmeeting(@PathVariable long fanmeetingId,
		@RequestBody FanmeetingRequestDto fanmeetingRequestDto,
		@AuthenticationPrincipal Member member) {
		fanmeetingService.updateFanmeeting(fanmeetingId, fanmeetingRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "팬미팅 방 삭제", description = "팬미팅 방을 삭제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@DeleteMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deleteFanmeeting(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		fanmeetingService.deleteFanmeeting(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "팬미팅 전체 조회", description = "팬미팅 전체를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FanmeetingOverViewDto>> getAllFanmeetings() {
		return fanmeetingService.getAllFanmeetings();
	}

	@Operation(summary = "특정 크리에이터 팬미팅 전체 조회", description = "특정 크리에이터의 팬미팅을 전체 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FanmeetingOverViewDto>> getFanmeetingsByCreator(@PathVariable long creatorId) {
		return fanmeetingService.getFanmeetingsByCreator(creatorId);
	}

	@Operation(summary = "팬미팅 상세 조회", description = "특정 팬미팅의 상세 정보를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<FanmeetingDetailDto> getFanmeetingDetail(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		return fanmeetingService.getFanmeetingDetail(fanmeetingId, member);
	}

	@Operation(summary = "크리에이터의 예정된 팬미팅 조회", description = "크리에이터의 예정된 팬미팅을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/scheduled/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FanmeetingOverViewDto>> getScheduledFanmeetingsByCreator(@PathVariable long creatorId) {
		return fanmeetingService.getScheduledFanmeetingsByCreator(creatorId);
	}

	@Operation(summary = "크리에이터의 종료된 팬미팅 정렬 조회", description = "크리에이터의 종료된 팬미팅을 정렬하여 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/completed/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FanmeetingOverViewDto>> getCompletedFanmeetingsByCreator(@PathVariable long creatorId,
		@RequestParam String sort, @RequestParam int top) {
		return fanmeetingService.getCompletedFanmeetingsByCreator(creatorId, sort, top);
	}

	@Operation(summary = "사용자가 예매한 팬미팅 조회", description = "사용자가 예매한 팬미팅을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, params = {"sort", "top"})
	public ResponseEntity<List<FanmeetingOverViewDto>> getFanmeetingsForUser(@RequestParam String sort,
		@RequestParam int top) {
		return fanmeetingService.getFanmeetingsForUser(sort, top);
	}

	@Operation(summary = "가장 최근 팬미팅 1개 조회", description = "가장 최근 팬미팅 1개를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/main", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<FanmeetingLatestDto> getLatestFanmeeting() {
		return fanmeetingService.getLatestFanmeeting();
	}
}
