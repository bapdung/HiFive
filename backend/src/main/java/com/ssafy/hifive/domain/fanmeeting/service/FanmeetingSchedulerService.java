package com.ssafy.hifive.domain.fanmeeting.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Getter
@RequiredArgsConstructor
@Slf4j
public class FanmeetingSchedulerService {
	private final FanmeetingService fanmeetingService;
	private final FanmeetingRepository fanmeetingRepository;
	// private List<Long> activeFanmeetingIds = new ArrayList<>();
	private List<Long> activeFanmeetingIds = new ArrayList<>(Arrays.asList(1L, 2L, 3L, 4L, 5L));

	@Scheduled(cron = "0 0 0 * * ?")
	public void updateActiveFanmeetingsId() {
		activeFanmeetingIds = fanmeetingRepository.getActiveFanmeetingIds()
			.stream()
			.map(Fanmeeting::getFanmeetingId)
			.collect(Collectors.toList());
		log.info("fanmeeting ids: {}", activeFanmeetingIds);
	}

}
