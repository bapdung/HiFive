package com.ssafy.hifive.domain.point.dto.request;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.point.entity.Point;
import com.ssafy.hifive.domain.point.entity.TransactionType;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PointRequestDto {
	private int money;

	public Point toEntity(Member member){
		return Point.builder()
			.type(TransactionType.PLUS)
			.member(member)
			.point(money)
			.detail(money + " 포인트 충전")
			.build();
	}
}
