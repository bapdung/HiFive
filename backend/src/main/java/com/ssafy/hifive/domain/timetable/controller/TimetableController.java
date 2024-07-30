package com.ssafy.hifive.domain.timetable.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;
import com.ssafy.hifive.domain.timetable.service.TimetableService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
@Tag(name = "timetable", description = "타임테이블 관련 API")
public class TimetableController {

	private final TimetableService timetableService;

	@Operation(summary = "타임테이블 전체 조회", description = "타임테이블 전체를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TimetableResponseDto>> getTimetableAll(@PathVariable long fanmeetingId) {
		return ResponseEntity.ok(timetableService.getTimetableAll(fanmeetingId));
	}
}
