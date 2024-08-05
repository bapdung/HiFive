package com.ssafy.hifive.domain.fanmeeting.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FanmeetingOverViewDto {

	private long fanmeetingId;
	private String title;
	private String posterImg;
	private LocalDateTime openDate;
	private LocalDateTime startDate;
	private int runningTime;

	public static FanmeetingOverViewDto from(Fanmeeting fanmeeting) {
		return new FanmeetingOverViewDto(
			fanmeeting.getFanmeetingId(),
			fanmeeting.getTitle(),
			fanmeeting.getPosterImg(),
			fanmeeting.getOpenDate(),
			fanmeeting.getStartDate(),
			fanmeeting.getRunningTime()
		);
	}
}
