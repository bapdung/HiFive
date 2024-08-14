package com.ssafy.hifive.domain.reservation.service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.global.config.redis.RedisPublisher;
import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationSchedulerService {
	private final ReservationQueueService reservationQueueService;
	private final RedisPublisher redisPublisher;
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplateForObject;
	private final ReservationWebSocketHandler reservationWebSocketHandler;
	private int t = 0;

	@Scheduled(fixedRate = 5000)
	public void checkWaiting() {
		String pattern = "fanmeeting:*:waiting-queue";
		Set<String> queueKeys = redisTemplateForObject.keys(pattern);
		if (queueKeys != null) {
			for (String waitingQueueKey : queueKeys) {
				String[] parts = waitingQueueKey.split(":");
				Long fanmeetingId = Long.valueOf(parts[1]);
				try {
					Long currentWaitingQueueSize = reservationQueueService.getQueueSize(waitingQueueKey);
					if (currentWaitingQueueSize > 0) {
						WebSocketMessage message = new WebSocketMessage(
							"현재 대기자 수: " + currentWaitingQueueSize,
							"currentQueueSize");

						String jsonMessage = objectMapper.writeValueAsString(message);
						redisPublisher.publish(fanmeetingId, jsonMessage);
					}
					if(currentWaitingQueueSize <= 0){
						t = 0;
						reservationWebSocketHandler.sendMessageToSession(fanmeetingId, 2L, "결제창으로 이동합니다.", "moveToPayment");
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Scheduled(fixedRate = 60000) // 3분마다 실행, 1분으로 수정
	public void checkExpiredPayments() {
		String pattern = "fanmeeting:*:paying-queue";
		Set<String> queueKeys = redisTemplateForObject.keys(pattern);
		long currentTime = System.currentTimeMillis();
		long timeout = TimeUnit.MINUTES.toMillis(1);

		if (queueKeys != null) {
			for (String queueKey : queueKeys) {
				String[] parts = queueKey.split(":");
				Long fanmeetingId = Long.valueOf(parts[1]);
				int count = 0;
				Set<ZSetOperations.TypedTuple<Object>> members = redisTemplateForObject.opsForZSet()
					.rangeWithScores(queueKey, 0, -1);
				if (members != null) {
					for (ZSetOperations.TypedTuple<Object> member : members) {
						Long memberId = Long.valueOf((String)member.getValue());
						Double score = member.getScore();
						if (score != null) {
							long elapsedTime = currentTime - score.longValue();
							// log.info("elapsedTime: " + elapsedTime);
							// log.info("timeout: " + timeout + " ms");
							if (elapsedTime > timeout) {
								count++;
								reservationQueueService.removeFromPayingQueue(queueKey, memberId);
								// log.info("만료시간인 사람 없애는 스케줄러 발동 {} 이 놈 삭제", memberId);
							} else {
								break;
							}
						}
					}
					if (count != 0) {
						String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
						reservationQueueService.moveFromWaitingToPayingQueue(fanmeetingId, waitingQueueKey,
							queueKey, count);
					}
				}
			}
		}
	}
}
