package com.ssafy.hifive.domain.comment.entity;

import com.ssafy.hifive.domain.board.entity.Board;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long commentId;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member memberId;

	@ManyToOne
	@JoinColumn(name = "board_id", nullable = false)
	private Board board;

	@Column(nullable = false, length = 200)
	private String contents;

	@Builder
	private Comment(Member memberId, Board board, String contents) {
		this.memberId = memberId;
		this.board = board;
		this.contents = contents;
	}
}
