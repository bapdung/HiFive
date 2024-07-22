package com.ssafy.hifive.domain.quiz.entity;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.global.entity.BaseEntity;

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
import lombok.Setter;

@Entity
@Table(name = "quiz")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quizId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeetingId;

	@Column(nullable = false, length = 100)
	private String problem;

	@Column(nullable = false)
	private Boolean answer;

	@Column(length = 100)
	private String detail;

	@Column(nullable = false)
	private Integer sequence;

	@Builder
	private Quiz(Fanmeeting fanmeetingId, String problem, Boolean answer, Integer sequence, String detail) {
		this.fanmeetingId = fanmeetingId;
		this.problem = problem;
		this.answer = answer;
		this.sequence = sequence;
		this.detail = detail;
	}
}
