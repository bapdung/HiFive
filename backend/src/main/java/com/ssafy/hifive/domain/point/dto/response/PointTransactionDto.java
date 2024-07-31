package com.ssafy.hifive.domain.point.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PointTransactionDto {
	private List<PointMinusDto> minusTransaction;
	private List<PointPlusDto> plusTransaction;
}
