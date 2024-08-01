package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingCustomRepository {
	List<Fanmeeting> findFanmeetingsByFanWithScrolling(long fanId,
		LocalDateTime top,
		String sort,
		boolean isScheduled);

	List<Fanmeeting> findScheduledFanmeetingAllByFan(long fanId);
}


