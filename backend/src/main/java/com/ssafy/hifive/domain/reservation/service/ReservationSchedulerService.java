package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Component;

import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingSchedulerService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReservationSchedulerService {
	private final ReservationQueueService reservationQueueService;
	private final FanmeetingSchedulerService fanmeetingSchedulerService;

	// @Scheduled(fixedRate = 5000)
	// public void checkAndMoveQueues() {
	// 	List<Long> activeFanmeetingIds = fanmeetingSchedulerService.getActiveFanmeetingIds();
	// 	for (Long fanmeetingId : activeFanmeetingIds) {
	// 		String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
	// 		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
	//
	// 		try {
	// 			Long currentPayingQueueSize = reservationQueueService.getQueueSize(payingQueueKey);
	// 			if (currentPayingQueueSize != null) {
	// 				int maxPayingQueueSize = 100;
	// 				int slotsAvailable = maxPayingQueueSize - currentPayingQueueSize.intValue();
	//
	// 				if (slotsAvailable > 0) {
	// 					reservationQueueService.moveFromWaitingToPayingQueue(waitingQueueKey, payingQueueKey, slotsAvailable);
	// 				}
	// 			}
	// 		} catch (Exception e) {
	// 			// 예외 처리 로직
	// 			e.printStackTrace();
	// 		}
	// 	}
	// }

}
