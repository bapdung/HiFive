package com.ssafy.hifive.domain.point.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.point.entity.Point;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointMinusDto {
	private LocalDateTime transactionDate;
	private String detail;
	private int point;

	public static PointMinusDto from(Point point){
		return new PointMinusDto(
			point.getCreatedDate(),
			point.getDetail(),
			point.getPoint()
		);
	}
}
