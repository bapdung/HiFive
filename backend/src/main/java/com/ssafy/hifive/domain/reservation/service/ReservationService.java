package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.reservation.dto.response.ReservationMemberDto;
import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {
	private final FanmeetingRepository fanmeetingRepository;
	private final ReservationFanmeetingPayService reservationFanmeetingPayService;
	private final ReservationQueueService reservationQueueService;
	private final ReservationFanmeetingReserveService reservationFanmeetingReserveService;
	private final ReservationValidService reservationValidService;
	private final ReservationWebSocketHandler reservationWebSocketHandler;

	public ReservationMemberDto reserve(long fanmeetingId, Member member) {
		if(!reservationWebSocketHandler.isSessionValid(fanmeetingId, member.getMemberId())){
			log.info("세션연결하자마자 끊김현상 발생 api 중단 및 null 전송");
			return null;
		}

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		reservationFanmeetingReserveService.checkReservation(fanmeeting, member);

		addToQueue(fanmeetingId, member.getMemberId());

		return ReservationMemberDto.from(member);
	}

	@Transactional
	public void pay(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		if (reservationValidService.isPaymentSessionExpired(payingQueueKey, member.getMemberId())) {
			checkAndMoveQueues(fanmeetingId);
			throw new BadRequestException(ErrorCode.PAYMENT_SESSION_EXPIRED);
		}

		int remainingTicket = reservationFanmeetingPayService.checkRemainingTicket(fanmeeting);

		reservationFanmeetingPayService.payTicket(fanmeeting, member, remainingTicket);

		reservationFanmeetingPayService.recordReservation(fanmeeting, member);

		reservationQueueService.removeFromPayingQueue(payingQueueKey, member.getMemberId());
		checkAndMoveQueues(fanmeetingId);
	}

	private void checkAndMoveQueues(long fanmeetingId) {
		String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		Long currentPayingQueueSize = reservationQueueService.getQueueSize(payingQueueKey);

		//하드코딩 : 1로 수정
		int slotsAvailable = 1 - currentPayingQueueSize.intValue();

		if (slotsAvailable > 0) {
			try {
				reservationQueueService.moveFromWaitingToPayingQueue(fanmeetingId, waitingQueueKey, payingQueueKey,
					slotsAvailable);
			} catch (Exception e) {
				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
			}

		}
	}

	public void addToQueue(Long fanmeetingId, Long memberId) {
		String waitingqueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
		String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
		if (reservationValidService.addToPayingQueueIsValid(payingQueueKey)) {
			log.info("ReservationService 현재 payingQueue 인원이 0명입니다. payingQueue에 추가됩니다.");
			reservationQueueService.addToPayingQueue(payingQueueKey, memberId, fanmeetingId);
		} else {
			reservationQueueService.addToWaitingQueue(waitingqueueKey, memberId);
			log.info("ReservationService 현재 payingQueue 인원이 1명으로 꽉차있습니다. waitingQueue에 추가됩니다.");
		}
	}
}
