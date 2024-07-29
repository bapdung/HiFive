package com.ssafy.hifive.domain.question.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.question.dto.param.QuestionParam;
import com.ssafy.hifive.domain.question.dto.request.QuestionRequestDto;
import com.ssafy.hifive.domain.question.dto.response.QuestionResponseDto;
import com.ssafy.hifive.domain.question.entity.Question;
import com.ssafy.hifive.domain.question.repository.QuestionRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;
import com.ssafy.hifive.global.util.FanmeetingValidator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

	private final QuestionRepository questionRepository;
	private final FanmeetingRepository fanmeetingRepository;
	private final FanmeetingValidator fanmeetingValidator;

	private final static int PAGE_SIZE = 5;

	private Pageable createPageable(QuestionParam param) {
		return PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE);
	}

	public List<QuestionResponseDto> getQuestionAll(long fanmeetingId, QuestionParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);
		Pageable pageable = createPageable(param);

		return questionRepository.findByFanmeeting_FanmeetingId(fanmeetingId, pageable).getContent().stream()
			.map(QuestionResponseDto::from).collect(Collectors.toList());
	}

	public List<QuestionResponseDto> getQuestionSelected(long fanmeetingId, QuestionParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);

		Pageable pageable = createPageable(param);

		return questionRepository.findByFanmeeting_FanmeetingIdAndIsPicked(fanmeetingId, true, pageable)
			.getContent().stream().map(QuestionResponseDto::from).collect(Collectors.toList());

	}

	public List<QuestionResponseDto> getQuestionUnselected(long fanmeetingId, QuestionParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);
		Pageable pageable = createPageable(param);

		return questionRepository.findByFanmeeting_FanmeetingIdAndIsPicked(fanmeetingId, false, pageable)
			.getContent().stream().map(QuestionResponseDto::from).collect(Collectors.toList());
	}

	@Transactional
	public void createQuestion(long fanmeetingId, QuestionRequestDto questionRequestDto, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		Question question = questionRequestDto.toEntity(fanmeeting, member);
		questionRepository.save(question);
	}

	@Transactional
	public void toggleQuestion(long questionId) {
		Question question = questionRepository.findById(questionId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.QUESTION_NOT_FOUND));
		question.toggleIsPicked();
	}

	public List<QuestionResponseDto> getMyQuestion(long fanmeetingId, Member member) {
		return questionRepository.findByFanmeeting_FanmeetingIdAndFan_MemberId(fanmeetingId,
			member.getMemberId()).stream().map(QuestionResponseDto::from).collect(Collectors.toList());
	}

	@Transactional
	public void updateQuestion(long questionId, QuestionRequestDto questionRequestDto, Member member) {

		Question question = questionRepository.findById(questionId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.QUESTION_NOT_FOUND));

		if (question.getFan().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		question.updateQuestion(questionRequestDto.getContents());
	}

	@Transactional
	public void deleteQuestion(long questionId, Member member) {

		Question question = questionRepository.findById(questionId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.QUESTION_NOT_FOUND));

		if (question.getFan().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		questionRepository.delete(question);
	}
}
