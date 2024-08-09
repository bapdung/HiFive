package com.ssafy.hifive.domain.reservation.service;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationValidService {
	private final ReservationQueueService reservationQueueService;
	private final RedisTemplate redisTemplateForObject;

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

	public boolean addToPayingQueueIsValid(String queueKey) {
		if (reservationQueueService.getQueueSize(queueKey) < 1) {
			// log.info("현재 payingQueue 인원이 0명입니다. payingQueue에 추가됩니다.");
			return true;
		}
		// log.info("현재 payingQueue 인원이 명으로 꽉차있습니다. waitingQueue에 추가됩니다.");
		return false;
	}

	public boolean isPaymentSessionExpired(String queueKey, Long memberId) {
		Double score = redisTemplateForObject.opsForZSet().score(queueKey, memberId.toString());
		if (score == null) {
			return true;
		}
		long currentTime = System.currentTimeMillis();
		long timeout = TimeUnit.MINUTES.toMillis(1);
		return currentTime - score > timeout;
	}
}
