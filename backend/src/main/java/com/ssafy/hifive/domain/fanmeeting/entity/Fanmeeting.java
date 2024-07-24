package com.ssafy.hifive.domain.fanmeeting.entity;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.member.entity.Member;
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
@Table(name = "fanmeeting")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fanmeeting extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long fanmeetingId;

	@ManyToOne
	@JoinColumn(name = "creator_id")
	private Member creator;

	@Column(nullable = false, length = 100)
	private String title;

	@Column(name = "poster_img", nullable = false)
	private String posterImg;

	@Column(nullable = false, length = 300)
	private String notice;

	@Column(nullable = false)
	private int participant;

	@Column(name = "start_date", nullable = false)
	private LocalDateTime startDate;

	@Column(name = "running_time", nullable = false)
	private int runningTime;

	@Column(nullable = false)
	private int price;

	@Column(name = "open_date")
	private LocalDateTime openDate;

	@Builder
	private Fanmeeting(Member creator, String title, String posterImg, String notice, int participant,
		LocalDateTime startDate, int runningTime, int price, LocalDateTime openDate) {
		this.creator = creator;
		this.title = title;
		this.posterImg = posterImg;
		this.notice = notice;
		this.participant = participant;
		this.startDate = startDate;
		this.runningTime = runningTime;
		this.price = price;
		this.openDate = openDate;
	}
}
