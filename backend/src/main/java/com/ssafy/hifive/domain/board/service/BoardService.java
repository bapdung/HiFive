package com.ssafy.hifive.domain.board.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.board.dto.param.BoardParam;
import com.ssafy.hifive.domain.board.dto.request.BoardRequestDto;
import com.ssafy.hifive.domain.board.dto.response.BoardResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;

@Service
public class BoardService {

	public ResponseEntity<List<BoardResponseDto>> getBoardAll(long creatorId, BoardParam param, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<BoardResponseDto> getBoardDetail(long boardId, Member member) {
		return ResponseEntity.ok(null);
	}

	public void createBoard(long creatorId, BoardRequestDto boardRequestDto, Member member) {
		return;
	}

	public void updateBoard(long boardId, BoardRequestDto boardRequestDto, Member member) {
		return;
	}

	public void deleteBoard(long boardId, Member member) {
		return;
	}
}
