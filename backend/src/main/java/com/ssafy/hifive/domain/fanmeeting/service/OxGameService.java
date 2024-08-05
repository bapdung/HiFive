package com.ssafy.hifive.domain.fanmeeting.service;

import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.dto.request.OxGameResultDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OxGameService {

	private final RedisTemplate<String, Object> redisTemplate;
	private final ZSetOperations<String, Object> zSetOperations;

	public void saveGameResult(OxGameResultDto oxGameResultDto) {
		String key = "oxgame:" + oxGameResultDto.getSessionId() + ":quiz:" + oxGameResultDto.getQuestionNum();
		zSetOperations.add(key, oxGameResultDto.getMemberId(), oxGameResultDto.getScore());
	}

	public Set<ZSetOperations.TypedTuple<Object>> getOxGameRanking(String sessionId) {
		String keyPattern = "oxgame:" + sessionId + ":quiz:*";
		Set<String> keys = redisTemplate.keys(keyPattern);

		String finalKey = "oxgame:" + sessionId + ":final";
		redisTemplate.delete(finalKey);

		keys.forEach(key -> {
			Set<ZSetOperations.TypedTuple<Object>> scores = zSetOperations.rangeWithScores(key, 0, -1);
			scores.forEach(score -> {
				long memberId = Long.parseLong(score.getValue().toString());
				double userScore = score.getScore();
				zSetOperations.incrementScore(finalKey, memberId, userScore);
			});
		});

		return zSetOperations.reverseRangeWithScores(finalKey, 0, -1);
	}

	public void clearGameResults(String sessionId) {
		String keyPattern = "oxgame:" + sessionId + ":*";
		Set<String> keys = redisTemplate.keys(keyPattern);
		redisTemplate.delete(keys);
	}
}
