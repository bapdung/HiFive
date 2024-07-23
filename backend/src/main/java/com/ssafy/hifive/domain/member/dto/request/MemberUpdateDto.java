package com.ssafy.hifive.domain.member.dto.request;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberUpdateDto {
	private String profileImg;
	private String name;
	private String nickname;
	private String email;

	public Member toEntity(Member member) {
		return Member.builder()
			.profileImg(profileImg)
			.name(name)
			.nickname(nickname)
			.email(email)
			.build();
	}
}
