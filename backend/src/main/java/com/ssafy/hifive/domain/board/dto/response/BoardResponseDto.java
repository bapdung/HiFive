package com.ssafy.hifive.domain.board.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.board.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class BoardResponseDto {
	private long boardId;
	private String boardImg;
	private LocalDateTime createdDate;
	private String contents;
	private int totalPages;

	public static BoardResponseDto from(Board board, int totalPages) {
		return new BoardResponseDto(
			board.getBoardId(),
			board.getBoardImg(),
			board.getCreatedDate(),
			board.getContents(),
			totalPages
		);
	}
}
