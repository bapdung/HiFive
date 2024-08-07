package com.ssafy.hifive.domain.member.dto.response;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class MemberIdentificationResponseDto {
	private String identificationImg;
	private String name;

	public static MemberIdentificationResponseDto from(Member member) {
		return new MemberIdentificationResponseDto(member.getIdentificationImg(), member.getName());
	}
}
