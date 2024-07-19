package com.ssafy.hifive.domain.fanmeeting.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "fanmeeting")
@Getter
@Setter
public class Fanmeeting extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fanmeetingId;

	@ManyToOne
	@JoinColumn(name = "creator_id")
	private Member creatorId;

	@Column(nullable = false, length = 100)
	private String title;

	@Column(name = "poster_img", nullable = false)
	private String posterImg;

	@Column(nullable = false)
	private String notice;

	@Column(nullable = false)
	private Integer participant;

	@Column(name = "start_time", nullable = false)
	private LocalDate startTime;

	@Column(name = "running_time", nullable = false)
	private Integer runningTime;

	@Column(nullable = false)
	private Integer price;

	@Column(name = "open_date")
	private LocalDateTime openDate;
}
