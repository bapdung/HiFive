package com.ssafy.hifive.domain.timetable.entity;

import com.ssafy.hifive.domain.category.entity.Category;
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
@Table(name = "timetable")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Timetable extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long timetableId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeeting;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category categoryId;

	@Column(nullable = false)
	private int sequence;

	@Column(name = "detail_name", nullable = false, length = 20)
	private String detailName;

	@Builder
	private Timetable(Fanmeeting fanmeeting, Category categoryId, Integer sequence, String detailName) {
		this.fanmeeting = fanmeeting;
		this.categoryId = categoryId;
		this.sequence = sequence;
		this.detailName = detailName;
	}
}
