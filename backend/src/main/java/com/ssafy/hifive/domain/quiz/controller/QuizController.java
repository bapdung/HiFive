package com.ssafy.hifive.domain.quiz.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.quiz.dto.request.QuizRequestDto;
import com.ssafy.hifive.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.hifive.domain.quiz.service.QuizService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@Tag(name = "quiz", description = "퀴즈 관련 API")
public class QuizController {
	private final QuizService quizService;

	@Operation(summary = "퀴즈 생성", description = "특정 팬미팅의 퀴즈를 생성한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createQuiz(@PathVariable long fanmeetingId,
		@RequestBody QuizRequestDto quizRequestDto,
		@AuthenticationPrincipal Member member) {
		quizService.createQuiz(fanmeetingId, quizRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "퀴즈 목록 조회", description = "특정 팬미팅의 모든 퀴즈를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{fanmeetingId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuizResponseDto>> getQuizAll(@PathVariable long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getQuizAll(fanmeetingId));
	}

	@Operation(summary = "퀴즈 수정", description = "특정 퀴즈를 수정한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PutMapping(path = "/{quizId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateQuiz(@PathVariable long quizId,
		@RequestBody QuizRequestDto quizRequestDto,
		@AuthenticationPrincipal Member member) {
		quizService.updateQuiz(quizId, quizRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "퀴즈 삭제", description = "특정 퀴즈를 삭제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(path = "/{quizId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deleteQuiz(@PathVariable long quizId,
		@AuthenticationPrincipal Member member) {
		quizService.deleteQuiz(quizId, member);
		return ResponseEntity.ok().build();
	}
}
