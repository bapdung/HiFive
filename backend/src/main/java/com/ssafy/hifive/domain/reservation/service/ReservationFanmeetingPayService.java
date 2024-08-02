package com.ssafy.hifive.domain.reservation.service;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.point.entity.Point;
import com.ssafy.hifive.domain.point.entity.TransactionType;
import com.ssafy.hifive.domain.point.repository.PointRepository;
import com.ssafy.hifive.domain.reservation.entity.Reservation;
import com.ssafy.hifive.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationFanmeetingPayService {
	private final RedisTemplate<String, Integer> redisTemplate;
	private final ReservationRepository reservationRepository;
	private final PointRepository pointRepository;
	private final MemberRepository memberRepository;
	private final ReservationValidService reservationValidService;

	public int checkRemainingTicket(Fanmeeting fanmeeting) {
		String cacheKey = "fanmeeting:" + fanmeeting.getFanmeetingId() + ":remaining-ticket";
		Integer remainingTicket = redisTemplate.opsForValue().get(cacheKey);

		if(remainingTicket == null) {
			int participant = fanmeeting.getParticipant();
			int reservedTicketCount = reservationRepository.reservedTicketCountByFanmeetingId(fanmeeting.getFanmeetingId());
			remainingTicket = participant - reservedTicketCount;
			redisTemplate.opsForValue().set(cacheKey, remainingTicket, 10, TimeUnit.MINUTES);
		}
		return remainingTicket;
	}

	@Transactional
	public void payTicket(Fanmeeting fanmeeting, Member member, int remainingTicket) {

		reservationValidService.ReservationIsValid(remainingTicket); //결제 전 한 번 더 점검하는 로직

		int price = fanmeeting.getPrice();
		String detail = fanmeeting.getTitle();

		reservationValidService.PointIsValid(member, price);

		member.updatePoint(member.getPoint() - price);
		memberRepository.save(member);

		Point point = Point.builder()
			.member(member)
			.detail(detail)
			.point(price)
			.type(TransactionType.MINUS)
			.build();
		pointRepository.save(point);

		decreaseTicketCount(fanmeeting.getFanmeetingId(), remainingTicket);
	}

	@Transactional
	public void recordReservation(Fanmeeting fanmeeting, Member member) {
		Reservation reservation = Reservation.builder()
			.fanmeeting(fanmeeting)
			.fan(member)
			.build();
		reservationRepository.save(reservation);
	}

	private void decreaseTicketCount(long fanmeetingId, int remainingTicket) {
		String cacheKey ="fanmeeting:" + fanmeetingId + ":remaining-ticket";
		redisTemplate.opsForValue().set(cacheKey, remainingTicket - 1, 10, TimeUnit.MINUTES);
	}
}
