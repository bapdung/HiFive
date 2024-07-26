package com.ssafy.hifive.domain.question.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRespository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.question.dto.param.QuestionParam;
import com.ssafy.hifive.domain.question.dto.request.QuestionRequestDto;
import com.ssafy.hifive.domain.question.dto.response.QuestionResponseDto;
import com.ssafy.hifive.domain.question.entity.Question;
import com.ssafy.hifive.domain.question.repository.QuestionRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

	private final QuestionRepository questionRepository;
	private final MemberRepository memberRepository;
	private final FanmeetingRespository fanmeetingRespository;

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

	public void createQuestion(long fanmeetingId, QuestionRequestDto questionRequestDto, Member member) {
		member = memberRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException());
		Fanmeeting fanmeeting = fanmeetingRespository.findById(fanmeetingId)
			.orElseThrow(() -> new EntityNotFoundException());
		Question question = questionRequestDto.toEntity(fanmeeting, member);
		questionRepository.save(question);
	}

	public void toggleQuestion(long questionId) {
		Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException());
		question.toggleIsPicked();
		questionRepository.save(question);
	}

	public List<QuestionResponseDto> getMyQuestion(long fanmeetingId, Member member) {
		member = memberRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException());
		return questionRepository.findByFanmeeting_FanmeetingIdAndFan_MemberId(fanmeetingId,
				member.getMemberId())
			.stream().map(QuestionResponseDto::from).collect(Collectors.toList());
	}

	public void updateQuestion(long fanId, QuestionRequestDto questionRequestDto, Member member) {

	}

	public void deleteQuestion(long fanId, Member member) {
	}
}
