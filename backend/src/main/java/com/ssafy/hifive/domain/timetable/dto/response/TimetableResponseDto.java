package com.ssafy.hifive.domain.timetable.dto.response;

import com.ssafy.hifive.domain.timetable.entity.Timetable;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TimetableResponseDto {
	private String categoryName;
	private int sequence;
	private String detail;

	public static TimetableResponseDto from(Timetable timetable) {
		return new TimetableResponseDto(
			timetable.getCategory().getName(),
			timetable.getSequence(),
			timetable.getDetailName()
		);
	}
}