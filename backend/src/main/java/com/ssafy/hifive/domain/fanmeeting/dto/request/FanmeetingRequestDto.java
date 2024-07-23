package com.ssafy.hifive.domain.fanmeeting.dto.request;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.timetable.dto.request.TimetableRequestDto;
import com.ssafy.hifive.domain.timetable.entity.Timetable;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class FanmeetingRequestDto {
	private String title;
	private String posterImg;
	private String notice;
	private int participant;
	private int runningTime;
	private LocalDateTime startDate;
	private LocalDateTime openDate;
	private int price;
	private List<TimetableRequestDto> timetable;

	public Fanmeeting toEntity(Member creator) {

		List<Timetable> timetables = this.timetable.stream()
			.map(t -> t.toEntity(null))
			.collect(Collectors.toList());

		Fanmeeting fanmeeting = Fanmeeting.builder()
			.creator(creator)
			.title(title)
			.posterImg(posterImg)
			.notice(notice)
			.participant(participant)
			.runningTime(runningTime)
			.startDate(startDate)
			.openDate(openDate)
			.price(price)
			.timetable(timetables)
			.build();

		timetables.forEach(t -> t.setFanmeeting(fanmeeting));

		return fanmeeting;

	}
}
