package com.ssafy.hifive.domain.reservation.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationQueueService {
	private final RedisTemplate<String, Object> redisTemplate;

	public void addToQueue(String key, Long memberId) {
		long score = System.currentTimeMillis(); // 서버 시간 기준으로 점수를 설정
		redisTemplate.opsForZSet().add(key, memberId, score);
	}

	public void removeFromQueue(String key, Long memberId) {
		redisTemplate.opsForZSet().remove(key, memberId);
	}

	public Long getQueuePosition(String key, Long memberId) {
		return redisTemplate.opsForZSet().rank(key, memberId);
	}

	public Set<Long> getQueueMembersInRange(String key, long start, long end) {
		Set<Object> members = redisTemplate.opsForZSet().range(key, start, end);
		return members.stream().map(member -> (Long) member).collect(Collectors.toSet());
	}

	// public void addToWaitingQueue(long fanmeetingId, long memberId) {
	// 	String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
	// 	redisTemplate.opsForList().leftPush(queueKey, memberId);
	// }
	//
	// public Long removeFromQueue(long fanmeetingId) {
	// 	String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
	// 	return (Long) redisTemplate.opsForList().rightPop(queueKey);
	// }
	//
	// public void addToPayingQueue(String queueKey, long memberId) {
	// 	long score = System.currentTimeMillis();
	// 	redisTemplate.opsForZSet().add(queueKey, memberId, score);
	// }
	//
	// public void removeFromPayingQueue(String queueKey, long memberId) {
	// 	redisTemplate.opsForZSet().remove(queueKey, memberId);
	// }
}
