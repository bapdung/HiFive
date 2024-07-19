package com.ssafy.hifive.domain.follow.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseEntity;

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
@Table(name = "follow")
@Getter
@Setter
public class Follow extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long followId;

	@ManyToOne
	@JoinColumn(name = "creator_id", nullable = false)
	private Member creatorId;

	@ManyToOne
	@JoinColumn(name = "fan_id", nullable = false)
	private Member fanId;
}
