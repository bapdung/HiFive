package com.ssafy.hifive.domain.member.entity;

import com.ssafy.hifive.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(name = "profile_img")
	private String profileImg;

	@Column(name = "is_creator")
	private boolean isCreator;

	@Column(nullable = false, length = 30)
	private String name;

	@Column(nullable = false, unique = true, length = 100)
	private String nickname;

	@Column(nullable = false, unique = true, length = 100)
	private String email;

	@Enumerated(EnumType.STRING)
	@Column(name = "oauth_server", nullable = false)
	private OAuthServer oAuthServer = OAuthServer.KAKAO;

	@Column(name = "is_deleted")
	private boolean isDeleted = false;

	@Column(nullable = false)
	private int point = 0;

	@Column(name = "identification_img")
	private String identificationImg;

	public enum OAuthServer {
		KAKAO
	}
}
