package com.ssafy.hifive.domain.point.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.point.entity.Point;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class PointResponseDto {
	private String type;
	private int point;
	private LocalDateTime transactionDate;
	private String detail;

	public static PointResponseDto from(Point point) {
		return new PointResponseDto(point.getType().name(), point.getPoint(), point.getCreatedDate(),
			point.getDetail());
	}
}
