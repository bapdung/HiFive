package com.ssafy.hifive.domain.question.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.question.dto.param.QuestionParam;
import com.ssafy.hifive.domain.question.dto.request.QuestionRequestDto;
import com.ssafy.hifive.domain.question.dto.response.QuestionResponseDto;

@Service
public class QuestionService {
	public void createQuestion(long fanmeetingId, QuestionRequestDto questionRequestDto, Member member) {
	}

	public ResponseEntity<List<QuestionResponseDto>> getQuestionAll(long fanmeetingId, QuestionParam param,
		Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<QuestionResponseDto>> getQuestionSelected(long fanmeetingId, QuestionParam param,
		Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<QuestionResponseDto>> getQuestionUnselected(long fanmeetingId, QuestionParam param,
		Member member) {
		return ResponseEntity.ok(null);
	}

	public void toggleQuestion(long questionId, Member member) {
	}

	public ResponseEntity<List<QuestionResponseDto>> getMyQuestion(long fanId, Member member) {
		return ResponseEntity.ok(null); // 실제 데이터 반환
	}

	public void updateQuestion(long fanId, QuestionRequestDto questionRequestDto, Member member) {
	}

	public void deleteQuestion(long fanId, Member member) {
	}
}
