package com.ssafy.hifive.domain.reservation.service;

import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationQueueService {
	private final RedisTemplate<String, Object> redisTemplate;
	private final ReservationWebSocketHandler reservationWebSocketHandler;

	public void addToWaitingQueue(String queueKey, long memberId) {
		long score = System.currentTimeMillis();
		redisTemplate.opsForZSet().add(queueKey, memberId, score);
	}

	public Long removeFromWaitingQueue(String queueKey, Long memberId) {
		return redisTemplate.opsForZSet().remove(queueKey, memberId);
	}

	public void addToPayingQueue(String queueKey, long memberId) {
		long score = System.currentTimeMillis();
		redisTemplate.opsForZSet().add(queueKey, memberId, score);
	}

	public void removeFromPayingQueue(String queueKey, long memberId) {
		redisTemplate.opsForZSet().remove(queueKey, memberId);
	}

	public Long getQueueSize(String queueKey) {
		Long size = redisTemplate.opsForZSet().size(queueKey);
		return size != null ? size : 0L;

	}

	public void moveFromWaitingToPayingQueue(String waitingQueueKey, String payingQueueKey, int count) {
		Set<Object> members = redisTemplate.opsForZSet().range(waitingQueueKey, 0, count - 1);
		if (members != null) {
			for (Object memberId : members) {
				redisTemplate.opsForZSet().remove(waitingQueueKey, (Long) memberId);
				redisTemplate.opsForZSet().add(payingQueueKey, (Long) memberId, System.currentTimeMillis());
				try {
					reservationWebSocketHandler.sendMessageToSession((Long) memberId, "결제페이지로 이동합니다(wait -> pay)");
				} catch (Exception e) {
					throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
				}
			}
		}
	}
}
