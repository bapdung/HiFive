package com.ssafy.hifive.domain.reservation.service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationQueueService {
	private final RedisTemplate<String, Object> redisTemplateForObject;
	private final RedisTemplate<String, Integer> redisTemplateForInteger;
	private final ReservationWebSocketHandler reservationWebSocketHandler;

	public void addToWaitingQueue(String queueKey, Long memberId) {
		long score = System.currentTimeMillis();
		redisTemplateForObject.opsForZSet().add(queueKey, memberId.toString(), score);
		redisTemplateForObject.expire(queueKey, 5, TimeUnit.MINUTES);
	}

	public void removeFromWaitingQueue(String queueKey, Long memberId) {
		redisTemplateForObject.opsForZSet().remove(queueKey, memberId.toString());
		redisTemplateForObject.expire(queueKey, 30, TimeUnit.MINUTES);
	}

	public void addToPayingQueue(String queueKey, Long memberId, Long fanmeetingId) {
		long score = System.currentTimeMillis();
		log.info("payingQueueKey:{}", queueKey);
		redisTemplateForObject.opsForZSet().add(queueKey, memberId.toString(), score);
		try {
			reservationWebSocketHandler.sendMessageToSession(fanmeetingId, memberId, "결제창으로 이동합니다.", "moveToPayment");
		} catch (Exception e) {
			throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
		}
	}

	public void removeFromPayingQueue(String queueKey, Long memberId) {
		redisTemplateForObject.opsForZSet().remove(queueKey, memberId.toString());
	}

	public Long getQueueSize(String queueKey) {
		Long size = redisTemplateForObject.opsForZSet().size(queueKey);
		return size != null ? size : 0L;
	}

	public void moveFromWaitingToPayingQueue(Long fanmeetingId, String waitingQueueKey, String payingQueueKey, int count) {
		Set<Object> members = redisTemplateForObject.opsForZSet().range(waitingQueueKey, 0, count - 1);
		if (members != null) {
			for (Object memberId : members) {
				removeFromWaitingQueue(waitingQueueKey, Long.valueOf((String) memberId));
				addToPayingQueue(payingQueueKey, Long.valueOf((String) memberId), fanmeetingId);
			}
		}
	}
}
