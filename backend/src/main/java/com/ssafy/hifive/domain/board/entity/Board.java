package com.ssafy.hifive.domain.board.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseEntity;

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
import lombok.Setter;

@Entity
@Table(name = "board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardId;

	@ManyToOne
	@JoinColumn(name = "creator_id", nullable = false)
	private Member creatorId;

	@Column(name = "board_img")
	private String boardImg;

	@Column(nullable = false, length = 1000)
	private String contents;

	@Builder
	private Board(Member creatorId, String boardImg, String contents) {
		this.creatorId = creatorId;
		this.boardImg = boardImg;
		this.contents = contents;
	}

}
