package com.ssafy.hifive.domain.timetable.entity;

import com.ssafy.hifive.domain.category.entity.Category;
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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "timetable")
@Getter
@Setter
public class Timetable extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long timetableId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeetingId;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category categoryId;

	@Column(nullable = false)
	private Integer sequence;

	@Column(name = "detail_name", nullable = false, length = 20)
	private String detailName;
}
