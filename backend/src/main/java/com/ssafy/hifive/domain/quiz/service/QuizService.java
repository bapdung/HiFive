package com.ssafy.hifive.domain.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.quiz.dto.request.QuizRequestDto;
import com.ssafy.hifive.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.hifive.domain.quiz.repository.QuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;

	public List<QuizResponseDto> getQuizAll(long fanmeetingId) {
		return quizRepository.findAllByFanmeetingId(fanmeetingId)
			.stream().map(QuizResponseDto::from)
			.collect(Collectors.toList());
	}

	public void createQuiz(long fanmeetingId, QuizRequestDto quizRequestDto, Member member) {

	}

	public void updateQuiz(long quizId, QuizRequestDto quizRequestDto, Member member) {
	}

	public void deleteQuiz(long quizId, Member member) {
	}
}
