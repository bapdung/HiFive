package com.ssafy.hifive.domain.member.dto.response;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDto {
	private long MemberId;
	private String nickname;
	private String profileImg;
	private String email;
	private String name;
	private boolean isCreator;
	private int point;

	public static MemberResponseDto from(Member member) {
		return new MemberResponseDto(
			member.getMemberId(),
			member.getNickname(),
			member.getProfileImg(),
			member.getEmail(),
			member.getName(),
			member.isCreator(),
			member.getPoint()
		);
	}

}
