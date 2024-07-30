package com.ssafy.hifive.domain.comment.dto.request;

import com.ssafy.hifive.domain.board.entity.Board;
import com.ssafy.hifive.domain.comment.entity.Comment;
import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class CommentRequestDto {
	private String contents;

	public Comment toEntity(Board board, Member member) {
		return Comment.builder()
			.board(board)
			.member(member)
			.contents(contents)
			.build();
	}
}
