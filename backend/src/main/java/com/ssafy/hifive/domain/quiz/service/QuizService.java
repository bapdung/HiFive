package com.ssafy.hifive.domain.quiz.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.quiz.dto.request.QuizRequestDto;
import com.ssafy.hifive.domain.quiz.dto.response.QuizResponseDto;

@Service
public class QuizService {

	public ResponseEntity<List<QuizResponseDto>> getQuizAll(long fanmeetingId, Member member) {
		return ResponseEntity.ok(null);
	}

	public void createQuiz(long fanmeetingId, QuizRequestDto quizRequestDto, Member member) {
	}

	public void updateQuiz(long quizId, QuizRequestDto quizRequestDto, Member member) {
	}

	public void deleteQuiz(long quizId, Member member) {
	}
}
