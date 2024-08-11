package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduQuizRequestDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResultDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResultSequenceDto;
import com.ssafy.hifive.domain.quiz.entity.Quiz;
import com.ssafy.hifive.domain.quiz.repository.QuizRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenViduQuizService {

	private final RedisTemplate<String, Object> redisTemplate;
	private final ZSetOperations<String, Object> zSetOperations;
	private final FanmeetingRepository fanmeetingRepository;
	private final QuizRepository quizRepository;

	private String getQuizRedisKey(long fanmeetingId) {
		return "fanmeeting:" + fanmeetingId + ":quiz:";
	}

	private String getMemberAnswerRedisKey(long fanmeetingId) {
		return "fanmeeting:" + fanmeetingId + ":quiz:answers";
	}

	private String getQuestionAnswerRedisKey(long fanmeetingId, int sequence) {
		return "fanmeeting:" + fanmeetingId + ":quiz:" + sequence + ":answers";
	}

	public void getQuizzes(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (fanmeeting.getCreator().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		List<Quiz> quizList = quizRepository.findByFanmeeting_FanmeetingId(fanmeetingId);

		if (quizList.isEmpty()) {
			throw new DataNotFoundException(ErrorCode.QUIZ_NOT_FOUND);
		}

		List<OpenViduQuizDto> quizzes = quizList.stream()
			.map(quiz -> OpenViduQuizDto.from(quiz, quizList.size()))
			.collect(Collectors.toList());

		redisTemplate.opsForValue()
			.set(getQuizRedisKey(fanmeetingId), quizzes, fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);
	}

	public OpenViduQuizDto getQuizBySequence(long fanmeetingId, int sequence, Member member) {

		String redisKey = getQuizRedisKey(fanmeetingId);
		List<OpenViduQuizDto> quizzes = (List<OpenViduQuizDto>)redisTemplate.opsForValue()
			.get(redisKey);

		int adjustedSequence = sequence - 1;

		if (quizzes == null || adjustedSequence < 0 || adjustedSequence >= quizzes.size()) {
			throw new DataNotFoundException(ErrorCode.QUIZ_NOT_FOUND);
		}

		return quizzes.get(adjustedSequence);
	}

	public void submitSingleUserAnswer(long fanmeetingId, int sequence, Member member,
		OpenViduQuizRequestDto openViduQuizRequestDto) {
		String redisKey = getQuestionAnswerRedisKey(fanmeetingId, sequence);

		redisTemplate.opsForHash()
			.put(redisKey, String.valueOf(member.getMemberId()), openViduQuizRequestDto.isCorrect());

		if (openViduQuizRequestDto.isCorrect()) {
			redisTemplate.opsForZSet()
				.incrementScore(getMemberAnswerRedisKey(fanmeetingId), String.valueOf(member.getMemberId()), 1);
		}

		redisTemplate.expire(redisKey, 30, TimeUnit.MINUTES);
	}

	public List<OpenViduQuizResultSequenceDto> getResultsForQuestion(long fanmeetingId, int sequence) {

		String redisKey = getQuestionAnswerRedisKey(fanmeetingId, sequence);

		Map<Object, Object> answers = redisTemplate.opsForHash().entries(redisKey);

		return answers.entrySet().stream()
			.map(entry -> OpenViduQuizResultSequenceDto.from(
				Long.parseLong(entry.getKey().toString()),
				(Boolean)entry.getValue()))
			.collect(Collectors.toList());
	}

	public List<OpenViduQuizResultDto> getQuizRanking(long fanmeetingId) {
		String redisKey = getMemberAnswerRedisKey(fanmeetingId);

		Set<ZSetOperations.TypedTuple<Object>> rankedSet = zSetOperations.reverseRangeWithScores(redisKey, 0, -1);

		return rankedSet.stream()
			.map(tuple -> OpenViduQuizResultDto.from(Long.parseLong(tuple.getValue().toString()),
				tuple.getScore().intValue()))
			.collect(Collectors.toList());
	}

}
