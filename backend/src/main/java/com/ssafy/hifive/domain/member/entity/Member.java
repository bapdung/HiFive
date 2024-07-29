package com.ssafy.hifive.domain.member.entity;

import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long memberId;

	@Column(name = "profile_img")
	private String profileImg;

	@Column(name = "is_creator")
	private boolean isCreator;

	@Column(length = 30)
	private String name;

	@Column(nullable = false, unique = true, length = 100)
	private String nickname;

	@Column(nullable = false, unique = true, length = 100)
	private String email;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name = "oauth_server")
	private OauthServerType oAuthServer;

	@Column(name = "is_deleted")
	private boolean isDeleted;

	@Column(nullable = false)
	private int point;

	@Column(name = "identification_img")
	private String identificationImg;

	@Builder
	private Member(String profileImg, boolean isCreator, String name, String nickname, String email,
		OauthServerType oAuthServer, String identificationImg) {
		this.profileImg = profileImg;
		this.isCreator = isCreator;
		this.name = name;
		this.nickname = nickname;
		this.email = email;
		this.oAuthServer = OauthServerType.fromName("KAKAO");
		this.isDeleted = false;
		this.point = 0;
		this.identificationImg = identificationImg;

	}

	public void updateMember(String profileImg, String nickname) {
		this.profileImg = profileImg;
		this.nickname = nickname;
	}

	public void updateIdentification(String identificationImg) {
		this.identificationImg = identificationImg;
	}

	public void deleteMember() {
		this.isDeleted = true;
	}

	public String toString() {
		return memberId + " " + nickname + " " + profileImg;
	}

}
