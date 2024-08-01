package com.ssafy.hifive.domain.reservation.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
	private final FanmeetingRepository fanmeetingRepository;
	private final ReservationFanmeetingPayService reservationFanmeetingPayService;
	private final ReservationFanmeetingReserveService reservationFanmeetingReserveService;
	private final ReservationRedisService reservationRedisService;
	private final ReservationValidService reservationValidService;
	private final RedisTemplate<String, Object> redisTemplate;

	public void reserve(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		reservationFanmeetingReserveService.checkReservation(fanmeeting, member);

		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		Long queueSize = redisTemplate.opsForList().size(payingQueueKey);

		reservationValidService.addToPayingQueueIsValid(queueSize, fanmeetingId, member.getMemberId());

		reservationRedisService.addToPayingQueue(payingQueueKey, member.getMemberId());
	}

	@Transactional
	public void pay(long fanmeetingId, Member member) {
		String queueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		int remainingTicket = reservationFanmeetingPayService.checkRemainingTicket(fanmeeting);

		reservationFanmeetingPayService.payTicket(fanmeeting, member, remainingTicket);

		reservationFanmeetingPayService.recordReservation(fanmeeting, member);
		reservationRedisService.removeFromPayingQueue(queueKey, member.getMemberId());



	}
}
