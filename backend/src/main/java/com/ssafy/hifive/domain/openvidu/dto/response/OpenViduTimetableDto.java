package com.ssafy.hifive.domain.openvidu.dto.response;

import java.util.List;

import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduTimetableDto {
	private String sessionId;
	private List<TimetableResponseDto> timetables;

	public static OpenViduTimetableDto from(String sessionId, List<TimetableResponseDto> timetables){
		return new OpenViduTimetableDto(sessionId, timetables);
	}
}
