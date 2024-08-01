package com.ssafy.hifive.domain.quiz.entity;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long quizId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeeting;

	@Column(nullable = false, length = 100)
	private String problem;

	@Column(nullable = false)
	private boolean answer;

	@Column(length = 100)
	private String detail;

	@Column(nullable = false)
	private int sequence;

	@Builder
	private Quiz(Fanmeeting fanmeeting, String problem, boolean answer, int sequence, String detail) {
		this.fanmeeting = fanmeeting;
		this.problem = problem;
		this.answer = answer;
		this.sequence = sequence;
		this.detail = detail;
	}

	public void updateQuiz(String problem, boolean answer, String detail, int sequence) {
		this.problem = problem;
		this.answer = answer;
		this.sequence = sequence;
		this.detail = detail;
	}
}
