package com.ssafy.hifive.domain.timetable.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.ssafy.hifive.domain.timetable.entity.Timetable;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {

	@Modifying
	void deleteByFanmeeting_FanmeetingId(long fanmeetingId);

	List<Timetable> findByFanmeeting_FanmeetingId(long fanmeetingId);

}
