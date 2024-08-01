package com.ssafy.hifive.domain.reservation.service;

import java.util.List;
import java.util.Set;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingSchedulerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class QueueProcessor {
	private final ReservationQueueService reservationQueueService;
	private final FanmeetingSchedulerService fanmeetingSchedulerService;

	@Scheduled(fixedRate = 2000)
	public void processAllQueues() {
		List<Long> fanmeetingIds = fanmeetingSchedulerService.getActiveFanmeetingIds();
		for(Long fanmeetingId : fanmeetingIds) {
			processQueue(fanmeetingId);
		}
	}

	public void processQueue(Long fanmeetingId) {
		String queueKey = "fanmeeting:" + fanmeetingId + ":queue";

		Set<Long> members = reservationQueueService.getQueueMembersInRange(queueKey, 0, 9);
		for(Long memberId : members) {
			log.info("멤버 id가 {}인 멤버를 {} 팬미팅 결제 페이지로 이동시킵니다.", memberId , fanmeetingId);
			reservationQueueService.removeFromQueue(queueKey, memberId);
		}
	}

}
