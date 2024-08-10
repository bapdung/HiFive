package com.ssafy.hifive.domain.fanmeeting.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.hifive.domain.fanmeeting.dto.request.FanmeetingRequestDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.timetable.entity.Timetable;
import com.ssafy.hifive.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.NamedSubgraph;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NamedEntityGraph(
	name = "Fanmeeting.withCreatorProfile",
	attributeNodes = {
		@NamedAttributeNode(value = "creator", subgraph = "memberWithCreatorProfile")
	},
	subgraphs = {
		@NamedSubgraph(
			name = "memberWithCreatorProfile",
			attributeNodes = {
				@NamedAttributeNode("creatorProfile")
			}
		)
	}
)
@Table(name = "fanmeeting")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fanmeeting extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long fanmeetingId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator_id")
	private Member creator;

	@Column(nullable = false, length = 30)
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

	@Column(name = "is_ended")
	private boolean isEnded;

	@Column
	private String link;

	@OneToMany(mappedBy = "fanmeeting")
	private List<Timetable> timetable = new ArrayList<>();

	@Builder
	private Fanmeeting(Member creator, String title, String posterImg, String notice, int participant,
		LocalDateTime startDate, int runningTime, int price, LocalDateTime openDate, String link, List<Timetable> timetable) {
		this.creator = creator;
		this.title = title;
		this.posterImg = posterImg;
		this.notice = notice;
		this.participant = participant;
		this.startDate = startDate;
		this.runningTime = runningTime;
		this.price = price;
		this.openDate = openDate;
		this.isEnded = false;
		this.link = link;
		this.timetable = timetable;

	}

	public void updateTimetable(List<Timetable> timetables) {
		if (this.timetable == null) {
			this.timetable = new ArrayList<>();
		}
		this.timetable.clear();
		this.timetable.addAll(timetables);
	}

	public void updateFanmeeting(FanmeetingRequestDto dto) {
		this.title = dto.getTitle();
		this.posterImg = dto.getPosterImg();
		this.notice = dto.getNotice();
		this.participant = dto.getParticipant();
		this.startDate = dto.getStartDate();
		this.runningTime = dto.getRunningTime();
		this.openDate = dto.getOpenDate();
		this.price = dto.getPrice();
		this.link = dto.getLink();
	}
}
