package com.ssafy.hifive.domain.token.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Token extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long tokenId;

	@JoinColumn(name = "member_id", nullable = false)
	@ManyToOne
	private Member member;

	@Column(length = 255, nullable = false)
	private String refreshToken;

	@Builder
	public Token(Member member, String refreshToken) {
		this.member = member;
		this.refreshToken = refreshToken;
	}

	public Token update(String newRefreshToken) {
		this.refreshToken = newRefreshToken;
		return this;
	}

}
