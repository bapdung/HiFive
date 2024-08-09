package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduQuizRequestDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResponseDto;
import com.ssafy.hifive.domain.quiz.repository.QuizRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenViduQuizService {

	private final RedisTemplate<String, Object> redisTemplate;
	private final ZSetOperations<String, Object> zSetOperations;
	private final FanmeetingRepository fanmeetingRepository;
	private final QuizRepository quizRepository;

	public List<OpenViduQuizResponseDto> getQuizzesByFanmeetingId(long fanmeetingId) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new EntityNotFoundException("Fanmeeting not found with id " + fanmeetingId));

		return quizRepository.findByFanmeeting(fanmeeting).stream()
			.map(OpenViduQuizResponseDto::from)
			.collect(Collectors.toList());
	}

	public void saveGameResult(OpenViduQuizRequestDto openViduQuizRequestDto) {
		String key =
			"oxgame:" + openViduQuizRequestDto.getSessionId() + ":quiz:" + openViduQuizRequestDto.getQuestionNum();
		zSetOperations.add(key, openViduQuizRequestDto.getMemberId(), openViduQuizRequestDto.getScore());
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
