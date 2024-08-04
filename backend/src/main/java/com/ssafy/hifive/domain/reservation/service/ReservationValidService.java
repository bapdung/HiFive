package com.ssafy.hifive.domain.reservation.service;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
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

	public boolean addToPayingQueueIsValid(String queueKey){
		if(	reservationQueueService.getQueueSize(queueKey) < 100){
			return true;
		}
		return false;
	}

	public boolean isPaymentSessionExpired(String queueKey, Long memberId) {
		Double score = redisTemplateForObject.opsForZSet().score(queueKey, memberId.toString());
		if (score == null) {
			return true;
		}
		long currentTime = System.currentTimeMillis();
		long timeout = TimeUnit.MINUTES.toMillis(5);
		return currentTime - score > timeout;
	}
}
