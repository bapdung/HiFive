package com.ssafy.hifive.domain.reservation.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingSchedulerService;
import com.ssafy.hifive.global.config.Redis.RedisPublisher;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReservationSchedulerService {
	private final ReservationQueueService reservationQueueService;
	private final FanmeetingSchedulerService fanmeetingSchedulerService;
	private final RedisPublisher redisPublisher;
	private final ObjectMapper objectMapper;

	@Scheduled(fixedRate = 10000)
	public void checkWaiting() {
		List<Long> activeFanmeetingIds = fanmeetingSchedulerService.getActiveFanmeetingIds();
		for (Long fanmeetingId : activeFanmeetingIds) {
			String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";

			try {
				Long currentWaitingQueueSize = reservationQueueService.getQueueSize(waitingQueueKey);

				if (currentWaitingQueueSize > 0) {
					WebSocketMessage message = new WebSocketMessage(
						"현재 대기자 수: " + currentWaitingQueueSize,
						"currentQueueSize");

					String jsonMessage = objectMapper.writeValueAsString(message);
					redisPublisher.publish(fanmeetingId, jsonMessage);
				}

			} catch (Exception e) {
				// 예외 처리 로직
				e.printStackTrace();
			}
		}
	}
}
