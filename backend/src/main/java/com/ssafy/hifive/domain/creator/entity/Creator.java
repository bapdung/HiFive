package com.ssafy.hifive.domain.creator.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "creator_profile")
@Getter
@Setter
public class Creator extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long creatorProfileId;

	@OneToOne
	@JoinColumn(name = "creator_id", unique = true, nullable = false)
	private Member creatorId;

	@Column(name = "creator_img")
	private String creatorImg;

	@Column(name = "creator_name", length = 50)
	private String creatorName;

	@Column(nullable = false, length = 200)
	private String link;

	@Column(nullable = false, length = 100)
	private String description;

	@Column(nullable = false)
	private Integer follower = 0;
}
