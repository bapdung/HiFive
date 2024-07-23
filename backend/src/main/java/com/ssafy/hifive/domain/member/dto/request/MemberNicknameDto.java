package com.ssafy.hifive.domain.member.dto.request;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberNicknameDto {
	private String nickname;

	public Member toEntity(Member member) {
		return Member.builder()
			.nickname(nickname)
			.build();
	}

}
