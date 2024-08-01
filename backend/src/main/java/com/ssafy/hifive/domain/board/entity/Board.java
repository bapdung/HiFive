package com.ssafy.hifive.domain.board.entity;

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
@Table(name = "board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long boardId;

	@ManyToOne
	@JoinColumn(name = "creator_id", nullable = false)
	private Member creator;

	@Column(name = "board_img")
	private String boardImg;

	@Column(nullable = false, length = 1000)
	private String contents;

	public void updateBoard(String contents, String boardImg) {
		this.contents = contents;
		this.boardImg = boardImg;
	}

	@Builder
	private Board(Member creator, String boardImg, String contents) {
		this.creator = creator;
		this.boardImg = boardImg;
		this.contents = contents;
	}

}
