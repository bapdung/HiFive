package com.ssafy.hifive.global.config.Redis;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisPublisher {

	private final StringRedisTemplate redisTemplate;

	public void publish(Long fanmeetingId, String message) {
		String topic = "fanmeeting:" + fanmeetingId;
		redisTemplate.convertAndSend(topic, message);
		System.out.println("Publishing message to topic: " + topic + " with message: " + message);
	}
}
