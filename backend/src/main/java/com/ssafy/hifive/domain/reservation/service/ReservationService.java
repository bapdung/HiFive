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
	private final ReservationQueueService reservationQueueService;
	private final ReservationValidService reservationValidService;
	private final RedisTemplate<String, Object> redisTemplate;

	public void reserve(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		reservationFanmeetingReserveService.checkReservation(fanmeeting, member);
		String queueKey = "fanmeeting:" + fanmeetingId + ":queue";

		reservationQueueService.addToQueue(queueKey, member.getMemberId());

		// String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		// Long queueSize = redisTemplate.opsForList().size(payingQueueKey);
		//
		// reservationValidService.addToPayingQueueIsValid(queueSize, fanmeetingId, member.getMemberId());
		//
		// reservationQueueService.addToPayingQueue(payingQueueKey, member.getMemberId());
	}

	@Transactional
	public void pay(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		int remainingTicket = reservationFanmeetingPayService.checkRemainingTicket(fanmeeting);

		reservationFanmeetingPayService.payTicket(fanmeeting, member, remainingTicket);

		reservationFanmeetingPayService.recordReservation(fanmeeting, member);

	}
}
