package com.ssafy.hifive.global.config;

import static org.assertj.core.api.AssertionsForClassTypes.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTemplateTest {

	@Autowired
	private RedisTemplate<String, Object> redisTemplateForObject;

	@Test
	public void testRedisConnection() {
		// Redis에 값 설정
		String key = "testKey";
		String value = "testValue";
		redisTemplateForObject.opsForValue().set(key, value);

		// Redis에서 값 조회
		Object retrievedValue = redisTemplateForObject.opsForValue().get(key);

		// 값 검증
		assertThat(retrievedValue).isEqualTo(value);
		System.out.println(retrievedValue);

		// Redis에서 키 삭제
		redisTemplateForObject.delete(key);

		// 키가 삭제되었는지 검증
		Object deletedValue = redisTemplateForObject.opsForValue().get(key);
		assertThat(deletedValue).isNull();
	}
}