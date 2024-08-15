package com.ssafy.hifive.domain.point.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.point.dto.param.PointParam;
import com.ssafy.hifive.domain.point.dto.request.PointRequestDto;
import com.ssafy.hifive.domain.point.dto.response.PointMinusDto;
import com.ssafy.hifive.domain.point.dto.response.PointPlusDto;
import com.ssafy.hifive.domain.point.service.PointService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
@Tag(name = "point", description = "포인트 관련 API")
public class PointController {
	private final PointService pointService;

	@Operation(summary = "사용자 충전 내역 조회", description = "특정 사용자의 충전 내역을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/plus",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PointPlusDto>> getPlusTransaction(
		@ModelAttribute PointParam param,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(pointService.getPlusTransaction(param, member));
	}

	@Operation(summary = "사용자 사용 내역 조회", description = "특정 사용자의 사용 내역을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/minus", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PointMinusDto>> getMinusTransaction(
		@ModelAttribute PointParam param,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(pointService.getMinusTransaction(param, member));
	}

	@Operation(summary = "포인트 충전", description = "사용자의 포인트를 충전한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> chargePoint(@RequestBody PointRequestDto pointRequestDto,
		@AuthenticationPrincipal Member member) {
		pointService.chargePoint(pointRequestDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
