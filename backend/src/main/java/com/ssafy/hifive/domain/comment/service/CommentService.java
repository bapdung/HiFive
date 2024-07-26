package com.ssafy.hifive.domain.comment.service;

import java.util.List;

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

	@Transactional(readOnly = true)
	public ResponseEntity<List<CommentResponseDto>> getCommentAll(long boardId, CommentParam param, Member member) {
		return ResponseEntity.ok(null);
	}

	@Transactional
	public void createComment(long boardId, CommentRequestDto commentRequestDto, Member member) {
	}

	@Transactional
	public void deleteComment(long commentId, Member member) {
	}

	@Transactional
	public void deleteByBoardId(long boardId) {
		commentRepository.deleteAllByBoardId(boardId);
	}
}
