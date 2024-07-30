package com.ssafy.hifive.domain.comment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.comment.dto.param.CommentParam;
import com.ssafy.hifive.domain.comment.dto.request.CommentRequestDto;
import com.ssafy.hifive.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.hifive.domain.comment.service.CommentService;
import com.ssafy.hifive.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Tag(name = "comment", description = "댓글 관련 API")
public class CommentController {

	private final CommentService commentService;

	@Operation(summary = "댓글 전체 조회", description = "특정 게시물의 모든 댓글을 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/{boardId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CommentResponseDto>> getCommentAll(@PathVariable long boardId,
		@ModelAttribute CommentParam param, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(commentService.getCommentAll(boardId, param));
	}

	@Operation(summary = "댓글 작성", description = "특정 게시물에 댓글을 작성한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{boardId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createComment(@PathVariable long boardId,
		@RequestBody CommentRequestDto commentRequestDto,
		@AuthenticationPrincipal Member member) {
		commentService.createComment(boardId, commentRequestDto, member);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@Operation(summary = "댓글 삭제", description = "특정 댓글을 삭제한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(path = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deleteComment(@PathVariable long commentId,
		@AuthenticationPrincipal Member member) {
		commentService.deleteComment(commentId, member);
		return ResponseEntity.ok().build();
	}
}
