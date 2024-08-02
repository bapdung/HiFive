package com.ssafy.hifive.domain.reservation.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.reservation.service.ReservationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
@Tag(name = "reservation", description = "팬미팅 예약 관련 API")
public class ReservationController {
	private final ReservationService reservationService;

	@Operation(summary = "팬미팅 예약", description = "특정 팬미팅을 예약한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> reserve(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		reservationService.reserve(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "팬미팅 결제", description = "특정 팬미팅을 결제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{fanmeetingId}/payment", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> pay(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		reservationService.pay(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}
}
