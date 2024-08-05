package com.ssafy.hifive.domain.reservation.dto.response;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReservationMemberDto {
	private String nickname;
	private String email;

	public static ReservationMemberDto from(Member member) {
		return new ReservationMemberDto(
			member.getNickname(),
			member.getEmail()
		);
	}
}
