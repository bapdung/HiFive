package com.ssafy.hifive.domain.point.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.point.entity.Point;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointPlusDto {
	private LocalDateTime transactionDate;
	private int money;
	private int point;
	private int totalPages;

	public static PointPlusDto from(Point point, int totalPages) {
		return new PointPlusDto(
			point.getCreatedDate(),
			point.getPoint(),
			point.getPoint(),
			totalPages
		);
	}
}
