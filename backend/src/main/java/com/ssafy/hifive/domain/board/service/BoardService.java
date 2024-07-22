package com.ssafy.hifive.domain.board.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.board.dto.param.BoardParam;
import com.ssafy.hifive.domain.board.dto.response.BoardResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;

@Service
public class BoardService {

	public ResponseEntity<BoardResponseDto> getBoardAll(Long creatorId, BoardParam param, Member member) {
		return ResponseEntity.ok(null);
	}
}
