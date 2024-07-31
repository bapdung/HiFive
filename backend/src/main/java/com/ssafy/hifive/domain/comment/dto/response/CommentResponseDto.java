package com.ssafy.hifive.domain.comment.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.comment.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class CommentResponseDto {
	private long commentId;
	private String nickname;
	private LocalDateTime createdDate;
	private String contents;

	public static CommentResponseDto from(Comment comment) {
		return new CommentResponseDto(
			comment.getCommentId(),
			comment.getMember().getNickname(),
			comment.getCreatedDate(),
			comment.getContents()
		);
	}
}
