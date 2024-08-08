package com.ssafy.hifive.domain.member.dto.request;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class MemberNameDto {
	private String name;

	public Member toEntity(Member member) {
		return Member.builder()
			.name(name)
			.build();
	}

}
