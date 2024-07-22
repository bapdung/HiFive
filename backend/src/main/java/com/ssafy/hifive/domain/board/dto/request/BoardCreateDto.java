package com.ssafy.hifive.domain.board.dto.request;

import com.ssafy.hifive.domain.board.entity.Board;
import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class BoardCreateDto {
	private String contents;
	private String boardImg;

	public Board toEntity(Member creator) {
		return Board.builder()
			.creator(creator)
			.contents(contents)
			.boardImg(boardImg)
			.build();
	}
}
