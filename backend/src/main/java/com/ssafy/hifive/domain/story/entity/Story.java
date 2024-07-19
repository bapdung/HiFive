package com.ssafy.hifive.domain.story.entity;

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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "story")
@Getter
@Setter
public class Story extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long storyId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeetingId;

	@ManyToOne
	@JoinColumn(name = "fan_id", nullable = false)
	private Member fanId;

	@Column(nullable = false)
	private String contents;

	@Column(name = "is_picked")
	private Boolean isPicked = false;

	@Column(nullable = false, length = 30)
	private String title;
}
