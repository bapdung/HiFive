package com.ssafy.hifive.domain.creator.entity;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creator_profile")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Creator extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long creatorProfileId;

	@OneToOne
	@JoinColumn(name = "creator_id", unique = true, nullable = false)
	private Member creator;

	@Column(name = "creator_img")
	private String creatorImg;

	@Column(name = "creator_name", length = 50)
	private String creatorName;

	@Column(nullable = false, length = 200)
	private String link;

	@Column(nullable = false, length = 100)
	private String description;

	@Column(nullable = false)
	private int follower;

	public void updateCreator(String link, String description) {
		this.link = link;
		this.description = description;
	}

	@Builder
	private Creator(Member creator, String creatorImg, String creatorName, String link, String description) {
		this.creator = creator;
		this.creatorImg = creatorImg;
		this.creatorName = creatorName;
		this.link = link;
		this.follower = 0;
		this.description = description;
	}
}
