package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.reservation.handler.ReservationWebSocketHandler;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
	private final FanmeetingRepository fanmeetingRepository;
	private final ReservationFanmeetingPayService reservationFanmeetingPayService;
	private final ReservationWebSocketHandler reservationWebSocketHandler;
	private final ReservationQueueService reservationQueueService;
	private final ReservationFanmeetingReserveService reservationFanmeetingReserveService;
	private final ReservationValidService reservationValidService;

	public void reserve(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		reservationFanmeetingReserveService.checkReservation(fanmeeting, member);

		String queueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		if(reservationValidService.addToPayingQueueIsValid(payingQueueKey)){
			reservationQueueService.addToPayingQueue(payingQueueKey, member.getMemberId());
		} else {
			reservationQueueService.addToWaitingQueue(queueKey, member.getMemberId());
		}
	}

	@Transactional
	public void pay(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		int remainingTicket = reservationFanmeetingPayService.checkRemainingTicket(fanmeeting);

		reservationFanmeetingPayService.payTicket(fanmeeting, member, remainingTicket);

		reservationFanmeetingPayService.recordReservation(fanmeeting, member);

		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		try {
			reservationQueueService.removeFromPayingQueue(payingQueueKey, member.getMemberId());
			checkAndMoveQueues(fanmeetingId);

		} catch (Exception e) {
			throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
		}
	}

	//이걸 스케줄링으로 처리할지, 지금처럼 한 명 나가면 체크하는 로직으로 짤지 고민 중
	private void checkAndMoveQueues(long fanmeetingId) {
		String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		Long currentPayingQueueSize = reservationQueueService.getQueueSize(payingQueueKey);

		int slotsAvailable = 100 - currentPayingQueueSize.intValue();

		if (slotsAvailable > 0) {
			try {
				reservationQueueService.moveFromWaitingToPayingQueue(waitingQueueKey, payingQueueKey, slotsAvailable);
			} catch (Exception e) {
				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
			}

		}
	}
}
