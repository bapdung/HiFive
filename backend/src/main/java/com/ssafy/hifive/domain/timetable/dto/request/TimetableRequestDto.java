package com.ssafy.hifive.domain.timetable.dto.request;

import com.ssafy.hifive.domain.category.entity.Category;
import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.timetable.entity.Timetable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TimetableRequestDto {

	private Category category;
	private int sequence;
	private String detail;

	public Timetable toEntity(Fanmeeting fanmeeting) {
		return Timetable.builder()
			.fanmeeting(fanmeeting)
			.category(category)
			.sequence(sequence)
			.detailName(detail)
			.build();
	}

}