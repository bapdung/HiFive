package com.ssafy.hifive.domain.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import com.ssafy.hifive.domain.board.dto.param.BoardParam;
import com.ssafy.hifive.domain.board.dto.request.BoardRequestDto;
import com.ssafy.hifive.domain.board.dto.response.BoardResponseDto;
import com.ssafy.hifive.domain.board.service.BoardService;
import com.ssafy.hifive.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Tag(name = "board", description = "크리에이터 게시판 관련 API")
public class BoardController {
	private final BoardService boardService;

	@Operation(summary = "게시글 전체 조회", description = "특정 크리에이터의 게시글을 전체 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BoardResponseDto>> getBoardAll(@PathVariable long creatorId,
		@ModelAttribute BoardParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(boardService.getBoardAll(creatorId, param));
	}

	@Operation(summary = "게시글 상세 조회", description = "특정 크리에이터의 특정 게시물을 상세 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/detail/{boardId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BoardResponseDto> getBoardDetail(@PathVariable long boardId,
		@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(boardService.getBoardDetail(boardId));
	}

	@Operation(summary = "게시글 생성", description = "특정 크리에이터의 게시글 생성")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PostMapping(path = "/{creatorId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createBoard(@PathVariable long creatorId, @RequestBody BoardRequestDto boardRequestDto,
		@AuthenticationPrincipal Member member) {
		boardService.createBoard(creatorId, boardRequestDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@Operation(summary = "게시글 수정", description = "특정 크리에이터의 게시글 수정")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@PatchMapping(path = "/{boardId}")
	public ResponseEntity<Void> updateBoard(@PathVariable long boardId, @RequestBody BoardRequestDto boardRequestDto,
		@AuthenticationPrincipal Member member) {
		boardService.updateBoard(boardId, boardRequestDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "게시글 삭제", description = "특정 크리에이터의 게시글 삭제")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}"))
	)
	@DeleteMapping(path = "/{boardId}")
	public ResponseEntity<Void> deleteBoard(@PathVariable long boardId,
		@AuthenticationPrincipal Member member) {
		boardService.deleteBoard(boardId, member);
		return ResponseEntity.ok().build();
	}

}