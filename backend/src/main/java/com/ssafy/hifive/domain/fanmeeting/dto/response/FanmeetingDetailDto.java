package com.ssafy.hifive.domain.fanmeeting.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FanmeetingDetailDto {

	private String title;
	private String posterImg;
	private String notice;
	private int participant;
	private int runningTime;
	private LocalDateTime startDate;
	private LocalDateTime openDate;
	private int price;
	private List<TimetableResponseDto> timetable;

	public static FanmeetingDetailDto from(Fanmeeting fanmeeting) {
		return new FanmeetingDetailDto(
			fanmeeting.getTitle(),
			fanmeeting.getPosterImg(),
			fanmeeting.getNotice(),
			fanmeeting.getParticipant(),
			fanmeeting.getRunningTime(),
			fanmeeting.getStartDate(),
			fanmeeting.getOpenDate(),
			fanmeeting.getPrice(),
			fanmeeting.getTimetable().stream()
				.map(TimetableResponseDto::from)
				.collect(Collectors.toList())
		);
	}
}
