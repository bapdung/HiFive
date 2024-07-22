package com.ssafy.hifive.domain.question.entity;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
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
@Table(name = "question")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long questionId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeetingId;

	@ManyToOne
	@JoinColumn(name = "fan_id", nullable = false)
	private Member fanId;

	@Column(nullable = false, length = 30)
	private String problem;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(name = "is_picked", nullable = false)
	private Boolean isPicked;

	@Builder
	private Question(Fanmeeting fanmeetingId, Member fanId, String problem, String content) {
		this.fanmeetingId = fanmeetingId;
		this.fanId = fanId;
		this.problem = problem;
		this.content = content;
		this.isPicked = false;
	}
}
