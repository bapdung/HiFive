package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingCustomRepository {

	List<Fanmeeting> findScheduledFanmeetingAllByFan(long fanId, String sort);

	List<Fanmeeting> findFanmeetingsByCreatorWithScrolling(long creatorId,
		LocalDateTime top,
		String sort,
		boolean isScheduled);

	List<Fanmeeting> findCompletedFanmeetingAllByFan(long fanId, String sort);


	List<Fanmeeting> findFanmeetingByCreatorName(String creatorName);
}


