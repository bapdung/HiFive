package com.ssafy.hifive.domain.reservation.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationRedisService {
	private final RedisTemplate<String, Object> redisTemplate;

	public void addToWaitingQueue(long fanmeetingId, long memberId) {
		String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		redisTemplate.opsForList().leftPush(queueKey, memberId);
	}

	public Long removeFromWaitingQueue(long fanmeetingId) {
		String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		return (Long) redisTemplate.opsForList().rightPop(queueKey);
	}

	public void addToPayingQueue(String queueKey, long memberId) {
		redisTemplate.opsForList().rightPush(queueKey, memberId);
	}

	public boolean removeFromPayingQueue(String queueKey, long memberId) {
		Long removedCount = redisTemplate.opsForList().remove(queueKey, 0, memberId);
		return removedCount > 0;
	}
}
