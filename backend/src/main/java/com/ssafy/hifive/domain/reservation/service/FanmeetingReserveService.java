package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.reservation.repository.ReservationRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FanmeetingReserveService {
	private final ReservationRepository reservationRepository;

	public void checkReservation(Fanmeeting fanmeeting, Member member) {
		if(reservationRepository.checkReservation(fanmeeting.getFanmeetingId(), member.getMemberId()))
			throw new ForbiddenException(ErrorCode.ALREADY_RESERVATION);
	}


}
