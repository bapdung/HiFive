package com.ssafy.hifive.domain.reservation.service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingSchedulerService;
import com.ssafy.hifive.global.config.redisss.RedisPublisher;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationSchedulerService {
	private final ReservationQueueService reservationQueueService;
	private final FanmeetingSchedulerService fanmeetingSchedulerService;
	private final RedisPublisher redisPublisher;
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplateForObject;

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

	@Scheduled(fixedRate = 180000) // 3분마다 실행
	public void checkExpiredPayments() {
		String pattern = "fanmeeting:*:paying-queue";
		Set<String> queueKeys = redisTemplateForObject.keys(pattern);
		long currentTime = System.currentTimeMillis();
		long timeout = TimeUnit.MINUTES.toMillis(5);

		if (queueKeys != null) {
			for (String queueKey : queueKeys) {
				Set<ZSetOperations.TypedTuple<Object>> members = redisTemplateForObject.opsForZSet()
					.rangeWithScores(queueKey, 0, -1);
				if (members != null) {
					for (ZSetOperations.TypedTuple<Object> member : members) {
						Long memberId = Long.valueOf((String)member.getValue());
						Double score = member.getScore();
						if (score != null) {
							long elapsedTime = currentTime - score.longValue();
							if (elapsedTime > timeout) {
								reservationQueueService.removeFromPayingQueue(queueKey, memberId);
								log.info("Removed memberId {} from paying queue {} due to timeout", memberId, queueKey);
							} else {
								break;
							}
						}
					}
				}
			}
		}
	}
}
