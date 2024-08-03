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
		// for (Long fanmeetingId : activeFanmeetingIds) {
			String waitingQueueKey = "fanmeeting:" + 1 + ":waiting-queue";

			try {
				Long currentWaitingQueueSize = reservationQueueService.getQueueSize(waitingQueueKey);

				// WebSocketMessage 객체 생성
				WebSocketMessage message = new WebSocketMessage(
					"현재 대기자 수: " + currentWaitingQueueSize,
					"currentQueueSize");

				// 메시지를 JSON 형식으로 변환
				String jsonMessage = objectMapper.writeValueAsString(message);

				// Redis에 메시지 발행
				redisPublisher.publish(1L, jsonMessage);

			} catch (Exception e) {
				// 예외 처리 로직
				e.printStackTrace();
			}
		// }
	}

}
