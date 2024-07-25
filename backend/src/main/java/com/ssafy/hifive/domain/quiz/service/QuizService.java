package com.ssafy.hifive.domain.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.quiz.dto.request.QuizRequestDto;
import com.ssafy.hifive.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.hifive.domain.quiz.entity.Quiz;
import com.ssafy.hifive.domain.quiz.repository.QuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;

	public ResponseEntity<List<QuizResponseDto>> getQuizAll(long fanmeetingId, Member member) {
		List<Quiz> quizList = quizRepository.findAllByFanmeetingId(fanmeetingId);
		List<QuizResponseDto> quizResponseDtoList = quizList.stream()
			.map(QuizResponseDto::from)
			.collect(Collectors.toList());
		return ResponseEntity.ok(quizResponseDtoList);
	}

	public void createQuiz(long fanmeetingId, QuizRequestDto quizRequestDto, Member member) {

	}

	public void updateQuiz(long quizId, QuizRequestDto quizRequestDto, Member member) {
	}

	public void deleteQuiz(long quizId, Member member) {
	}
}
