package com.ssafy.hifive.domain.timetable.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;

@Service
public class TimetableService {

	public ResponseEntity<List<TimetableResponseDto>> getTimetableAll() {
		return ResponseEntity.ok(null);
	}
}
