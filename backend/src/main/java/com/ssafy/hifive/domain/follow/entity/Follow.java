package com.ssafy.hifive.domain.follow.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

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
@Table(name = "follow")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long followId;

	@ManyToOne
	@JoinColumn(name = "creator_id", nullable = false)
	private Member creator;

	@ManyToOne
	@JoinColumn(name = "fan_id", nullable = false)
	private Member fan;

	@Builder
	private Follow(Member creator, Member fan) {
		this.creator = creator;
		this.fan = fan;
	}
}
