package com.ssafy.hifive.domain.board.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.board.dto.param.BoardParam;
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
	public ResponseEntity<BoardResponseDto> getBoardAll(@PathVariable Long creatorId,
		@ModelAttribute BoardParam param,
		@AuthenticationPrincipal Member member) {
		return boardService.getBoardAll(creatorId, param, member);
	}
}