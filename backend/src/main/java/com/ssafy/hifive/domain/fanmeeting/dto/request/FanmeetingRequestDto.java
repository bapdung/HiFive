package com.ssafy.hifive.domain.fanmeeting.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.timetable.dto.request.TimetableCreateDto;

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
	private String link;
	private List<TimetableCreateDto> timetable;

	public Fanmeeting toEntity(Member creator) {

		return Fanmeeting.builder()
			.creator(creator)
			.title(title)
			.posterImg(posterImg)
			.notice(notice)
			.participant(participant)
			.runningTime(runningTime)
			.startDate(startDate)
			.openDate(openDate)
			.price(price)
			.link(link)
			.build();

	}
}
