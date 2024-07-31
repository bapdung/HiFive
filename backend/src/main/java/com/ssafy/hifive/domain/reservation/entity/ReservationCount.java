package com.ssafy.hifive.domain.reservation.entity;

import org.springframework.data.redis.core.RedisHash;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@RedisHash(value = "ReservationCount", timeToLive = 30)
public class ReservationCount {
	@Id
	private Long fanmeetingId;

	private int remainedTicket;

	@Builder
	private ReservationCount(Long fanmeetingId, int remainedTicket) {
		this.fanmeetingId = fanmeetingId;
		this.remainedTicket = remainedTicket;
	}
}
