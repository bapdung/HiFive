package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingCustomRepository {

	@EntityGraph(value = "Fanmeeting.withCreator", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findScheduledFanmeetingAllByFan(long fanId, String sort);

	@EntityGraph(value = "Fanmeeting.withCreator", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findFanmeetingsByCreatorWithScrolling(long creatorId,
		LocalDateTime top,
		String sort,
		boolean isScheduled);

	@EntityGraph(value = "Fanmeeting.withCreator", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findCompletedFanmeetingAllByFan(long fanId, String sort);

	@EntityGraph(value = "Fanmeeting.withCreator", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findFanmeetingByCreatorName(String creatorName);
}


