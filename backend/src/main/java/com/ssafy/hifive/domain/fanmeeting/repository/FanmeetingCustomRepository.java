package com.ssafy.hifive.domain.fanmeeting.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingCustomRepository {

	List<Fanmeeting> findScheduledFanmeetingAllByFan(long fanId);

	List<Fanmeeting> findCompletedFanmeetingAllByFan(long fanId);
}


