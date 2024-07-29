package com.ssafy.hifive.domain.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.quiz.dto.request.QuizRequestDto;
import com.ssafy.hifive.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.hifive.domain.quiz.entity.Quiz;
import com.ssafy.hifive.domain.quiz.repository.QuizRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;
	private final FanmeetingRepository fanmeetingRepository;

	public List<QuizResponseDto> getQuizAll(long fanmeetingId) {
		return quizRepository.findAllByFanmeetingId(fanmeetingId)
			.stream().map(QuizResponseDto::from)
			.collect(Collectors.toList());
	}

	@Transactional
	public void createQuiz(long fanmeetingId, QuizRequestDto quizRequestDto, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (member.getMemberId() != fanmeeting.getCreator().getMemberId() || !member.isCreator()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		quizRepository.save(quizRequestDto.toEntity(fanmeeting));
	}

	@Transactional
	public void updateQuiz(long quizId, QuizRequestDto quizRequestDto, Member member) {
		Quiz quiz = quizRepository.findById(quizId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.QUIZ_NOT_FOUND));

		Fanmeeting fanmeeting = fanmeetingRepository.findById(quiz.getFanmeeting().getFanmeetingId())
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (!member.isCreator() || fanmeeting.getCreator().getMemberId() != member.getMemberId())
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);

		quiz.updateQuiz(quizRequestDto.getProblem(), quizRequestDto.isAnswer(), quizRequestDto.getDetail(), quizRequestDto.getSequence());
	}

	@Transactional
	public void deleteQuiz(long quizId, Member member) {
		Quiz quiz = quizRepository.findById(quizId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.QUIZ_NOT_FOUND));

		Fanmeeting fanmeeting = fanmeetingRepository.findById(quiz.getFanmeeting().getFanmeetingId())
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (!member.isCreator() || fanmeeting.getCreator().getMemberId() != member.getMemberId())
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);

		quizRepository.delete(quiz);
	}
}
