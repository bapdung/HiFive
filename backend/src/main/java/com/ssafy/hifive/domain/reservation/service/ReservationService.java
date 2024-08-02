package com.ssafy.hifive.domain.reservation.service;

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
	private final ReservationQueueService reservationQueueService;
	private final ReservationFanmeetingReserveService reservationFanmeetingReserveService;

	public void reserve(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		reservationFanmeetingReserveService.checkReservation(fanmeeting, member);
		String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";

		reservationQueueService.addToWaitingQueue(queueKey, member.getMemberId());
		//소켓 이용한 로직으로 바꿀 예정
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
