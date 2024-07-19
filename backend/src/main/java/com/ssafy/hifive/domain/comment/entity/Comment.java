package com.ssafy.hifive.domain.comment.entity;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.board.entity.Board;
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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comment")
@Getter
@Setter
public class Comment extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentId;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@ManyToOne
	@JoinColumn(name = "board_id", nullable = false)
	private Board board;

	@Column(nullable = false, length = 200)
	private String contents;
}
