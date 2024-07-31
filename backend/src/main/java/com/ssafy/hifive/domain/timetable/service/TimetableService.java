package com.ssafy.hifive.domain.timetable.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TimetableService {

	private final TimetableRepository timetableRepository;

	public List<TimetableResponseDto> getTimetableAll(long fanmeetingId) {

		return timetableRepository.findByFanmeeting_FanmeetingId(fanmeetingId).stream()
			.map(TimetableResponseDto::from)
			.collect(Collectors.toList());
	}

	@Transactional
	public void deleteByTimetableId(long fanmeetingId) {
		timetableRepository.deleteByFanmeeting_FanmeetingId(fanmeetingId);
	}

}
