package com.ssafy.hifive.domain.timetable.dto.request;

import com.ssafy.hifive.domain.category.entity.Category;
import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.timetable.entity.Timetable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TimetableCreateDto {

	private long categoryId;
	private int sequence;
	private String detailName;

	public Timetable toEntity(Fanmeeting fanmeeting, Category category) {
		return Timetable.builder()
			.fanmeeting(fanmeeting)
			.category(category)
			.sequence(sequence)
			.detailName(detailName)
			.build();
	}

}