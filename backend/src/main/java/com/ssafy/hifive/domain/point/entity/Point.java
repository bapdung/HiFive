package com.ssafy.hifive.domain.point.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "point_transaction")
@Getter
@Setter
public class Point extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pointTransactionId;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member memberId;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TransactionType type;

	@Column(nullable = false)
	private int point;

	@Column(nullable = false)
	private String detail;

	public enum TransactionType {
		PLUS, MINUS
	}
}
