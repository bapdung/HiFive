package com.ssafy.hifive.domain.photo.entity;

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
@Table(name = "photo")
@Getter
@Setter
public class Photo extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long photoId;

	@ManyToOne
	@JoinColumn(name = "fan_id", nullable = false)
	private Member fanId;

	@ManyToOne
	@JoinColumn(name = "fanmeeting_id", nullable = false)
	private Fanmeeting fanmeetingId;

	@Column(name = "photo_img")
	private String photoImg;

	@Column(nullable = false)
	private Integer sequence;
}
