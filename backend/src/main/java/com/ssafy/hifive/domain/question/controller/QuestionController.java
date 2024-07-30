package com.ssafy.hifive.domain.question.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.question.dto.param.QuestionParam;
import com.ssafy.hifive.domain.question.dto.request.QuestionRequestDto;
import com.ssafy.hifive.domain.question.dto.response.QuestionResponseDto;
import com.ssafy.hifive.domain.question.service.QuestionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
@Tag(name = "question", description = "질문 관련 API")
public class QuestionController {

	private final QuestionService questionService;

	@Operation(summary = "질문 생성", description = "특정 팬미팅에 대한 질문을 생성한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createQuestion(@PathVariable long fanmeetingId,
		@RequestBody QuestionRequestDto questionRequestDto,
		@AuthenticationPrincipal Member member) {
		questionService.createQuestion(fanmeetingId, questionRequestDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@Operation(summary = "질문 목록 전체 조회", description = "특정 팬미팅의 모든 질문 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionResponseDto>> getQuestionAll(@PathVariable long fanmeetingId,
		@RequestParam QuestionParam param,
		@AuthenticationPrincipal Member member) {
		return questionService.getQuestionAll(fanmeetingId, param, member);
	}

	@Operation(summary = "선택된 질문 조회", description = "특정 팬미팅에서 선택된 질문 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}/selected", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionResponseDto>> getQuestionSelected(@PathVariable long fanmeetingId,
		@RequestParam QuestionParam param,
		@AuthenticationPrincipal Member member) {
		return questionService.getQuestionSelected(fanmeetingId, param, member);
	}

	@Operation(summary = "미선택 질문 조회", description = "특정 팬미팅에서 미선택된 질문 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}/unselected", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionResponseDto>> getQuestionUnselected(@PathVariable long fanmeetingId,
		@RequestParam QuestionParam param,
		@AuthenticationPrincipal Member member) {
		return questionService.getQuestionUnselected(fanmeetingId, param, member);
	}

	@Operation(summary = "질문 선택/비선택 토글", description = "질문을 선택하거나 비선택으로 변경한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PatchMapping(path = "/{questionId}/toggle")
	public ResponseEntity<Void> toggleQuestion(@PathVariable long questionId,
		@AuthenticationPrincipal Member member) {
		questionService.toggleQuestion(questionId, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "내가 작성한 질문 목록 조회", description = "내가 작성한 질문 목록을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionResponseDto>> getQuestionMine(@PathVariable long fanId,
		@AuthenticationPrincipal Member member) {
		return questionService.getMyQuestion(fanId, member);
	}

	@Operation(summary = "내가 작성한 질문 수정", description = "내가 작성한 질문을 수정한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PatchMapping(path = "/{fanId}")
	public ResponseEntity<Void> updateQuestion(@PathVariable long fanId,
		@RequestBody QuestionRequestDto questionRequestDto,
		@AuthenticationPrincipal Member member) {
		questionService.updateQuestion(fanId, questionRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "내가 작성한 질문 삭제", description = "내가 작성한 질문을 삭제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(path = "/{fanId}")
	public ResponseEntity<Void> deleteQuestion(@PathVariable long fanId,
		@AuthenticationPrincipal Member member) {
		questionService.deleteQuestion(fanId, member);
		return ResponseEntity.ok().build();
	}
}
