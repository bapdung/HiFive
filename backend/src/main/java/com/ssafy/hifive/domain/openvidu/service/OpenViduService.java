package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduTimetableDto;
import com.ssafy.hifive.domain.story.repository.StoryRepository;
import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenViduService {
	private final TimetableRepository timetableRepository;
	private final StoryRepository storyRepository;

	public OpenViduTimetableDto getTimetableAll(Long fanmeetingId, String sessionId) {
		List<TimetableResponseDto> timetables = timetableRepository.findByFanmeeting_FanmeetingId(fanmeetingId).stream()
			.map(TimetableResponseDto::from)
			.collect(Collectors.toList());
		return OpenViduTimetableDto.from(sessionId, timetables);
	}

}
