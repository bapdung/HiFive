package com.ssafy.hifive.domain.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hifive.domain.board.entity.Board;
import com.ssafy.hifive.domain.board.repository.BoardRepository;
import com.ssafy.hifive.domain.board.service.BoardService;
import com.ssafy.hifive.domain.comment.entity.Comment;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.comment.dto.param.CommentParam;
import com.ssafy.hifive.domain.comment.dto.request.CommentRequestDto;
import com.ssafy.hifive.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.hifive.domain.comment.repository.CommentRepository;
import com.ssafy.hifive.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;

	@Transactional(readOnly = true)
	public List<CommentResponseDto> getCommentAll(long boardId, CommentParam param, Member member) {
		Board board = boardRepository.findById(boardId)
				.orElseThrow(() -> new DataNotFoundException(ErrorCode.BOARD_NOT_FOUND));

		return commentRepository.findAllByBoardId(board.getBoardId()).stream()
				.map(CommentResponseDto::from)
				.toList();
	}

	@Transactional
	public void createComment(long boardId, CommentRequestDto commentRequestDto, Member member) {
		Board board = boardRepository.findById(boardId)
				.orElseThrow(() -> new DataNotFoundException(ErrorCode.BOARD_NOT_FOUND));

		commentRepository.save(commentRequestDto.toEntity(board, member));
	}

	@Transactional
	public void deleteComment(long commentId, Member member) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(()-> new DataNotFoundException(ErrorCode.COMMENT_NOT_FOUND));

		if(comment.getMember().getMemberId() != member.getMemberId()){
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		commentRepository.delete(comment);
	}

	@Transactional
	public void deleteByBoardId(long boardId) {
		commentRepository.deleteAllByBoardId(boardId);
	}
}
