package com.ssafy.hifive.domain.timetable.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TimetableService {

	private final TimetableRepository timetableRepository;

	public List<TimetableResponseDto> getTimetableAll() {

		List<TimetableResponseDto> timetableResponseDtos = new ArrayList<TimetableResponseDto>();

		return timetableResponseDtos;
	}

	@Transactional
	public void deleteByTimetableId(long fanmeetingId) {
		timetableRepository.deleteByFanmeeting_FanmeetingId(fanmeetingId);
	}

}
