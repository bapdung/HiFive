package com.ssafy.hifive.domain.reservation.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationQueueService {
	private final RedisTemplate<String, Object> redisTemplate;

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
}
