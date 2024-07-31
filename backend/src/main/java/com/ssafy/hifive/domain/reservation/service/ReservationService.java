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
	private final FanmeetingPayService fanmeetingPayService;
	private final FanmeetingReserveService fanmeetingReserveService;

	public void reserve(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		//1. 이미 예약했는지 여부 확인
		fanmeetingReserveService.checkReservation(fanmeeting, member);

		//레디스 queue등록 필요
	}

	@Transactional
	public void pay(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		int remainingTicket = fanmeetingPayService.checkRemainingTicket(fanmeeting);

		//2. 결제로직
		fanmeetingPayService.payTicket(fanmeeting, member, remainingTicket);

		//3. 예약기록
		fanmeetingPayService.recordReservation(fanmeeting, member);

	}
}
