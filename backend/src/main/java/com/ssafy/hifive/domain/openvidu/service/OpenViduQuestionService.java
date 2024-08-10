package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuestionDto;
import com.ssafy.hifive.domain.question.entity.Question;
import com.ssafy.hifive.domain.question.repository.QuestionRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenViduQuestionService {

	private final RedisTemplate<String, Object> redisTemplate;
	private final FanmeetingRepository fanmeetingRepository;
	private final QuestionRepository questionRepository;

	public void getQuestions(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (fanmeeting.getCreator().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		String questionKey = "fanmeeting:" + fanmeetingId + ":question";

		List<Question> questionList = questionRepository.findByFanmeeting_FanmeetingIdAndIsPickedTrue(fanmeetingId);

		if (questionList == null || questionList.isEmpty()) {
			throw new DataNotFoundException(ErrorCode.STORY_NOT_FOUND);
		}

		List<OpenViduQuestionDto> questions = questionList.stream()
			.map(question -> OpenViduQuestionDto.from(question, questionList.size()))
			.collect(Collectors.toList());

		redisTemplate.opsForValue().set(questionKey, questions, fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);

	}

	public OpenViduQuestionDto getQuestionBySequence(long fanmeetingId, int sequence, Member member) {

		String questionKey = "fanmeeting:" + fanmeetingId + ":question";
		List<OpenViduQuestionDto> questions = (List<OpenViduQuestionDto>)redisTemplate.opsForValue().get(questionKey);

		if (questions == null || sequence <= 0 || sequence >= questions.size()) {
			throw new DataNotFoundException(ErrorCode.STORY_NOT_FOUND);
		}

		return questions.get(sequence - 1);
	}
}
