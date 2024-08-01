package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationValidService {
	private final ReservationQueueService reservationQueueService;

	public void ReservationIsValid(int remainingTicket) {
		if (remainingTicket <= 0) {
			throw new BadRequestException(ErrorCode.TICKET_SOLD_OUT);
		}
	}

	public void PointIsValid(Member member, int price) {
		if (price > member.getPoint()) {
			throw new BadRequestException(ErrorCode.WANT_FOR_MONEY);
		}
	}

	// public void addToPayingQueueIsValid(Long queueSize, Long fanmeetingId, Long memberId) {
	// 	if (queueSize != null && queueSize >= 100) {
	// 		reservationQueueService.addToWaitingQueue(fanmeetingId, memberId);
	// 		throw new BadRequestException(ErrorCode.WAITING_IN_QUEUE);
	// 	}
	// }
}
