package com.ssafy.hifive.domain.reservation.service;

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
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FanmeetingPayService {
	private final ReservationRepository reservationRepository;
	private final PointRepository pointRepository;
	private final MemberRepository memberRepository;

	public int checkRemainedTicket(Fanmeeting fanmeeting) {
		int participant = fanmeeting.getParticipant();
		log.info("participant: {}", participant);
		int reservedTicketCount = reservationRepository.reservedTicketCountByFanmeetingId(fanmeeting.getFanmeetingId());
		log.info("reservedTicketCount: {}", reservedTicketCount);
		return participant - reservedTicketCount;
	}

	@Transactional
	public void payTicket(Fanmeeting fanmeeting, Member member) {
		int price = fanmeeting.getPrice();
		String detail = fanmeeting.getTitle();

		log.info("point: {}", member.getPoint());

		if(price <= member.getPoint()){
			member.updatePoint(member.getPoint() - price);
			memberRepository.save(member);

			Point point = Point.builder()
				.member(member)
				.detail(detail)
				.point(price)
				.type(TransactionType.MINUS)
				.build();
			pointRepository.save(point);
		} else {
			throw new DataNotFoundException(ErrorCode.WANT_FOR_MONEY);
		}
	}

	@Transactional
	public void recordReservation(Fanmeeting fanmeeting, Member member) {
		Reservation reservation = Reservation.builder()
			.fanmeeting(fanmeeting)
			.fan(member)
			.build();
		reservationRepository.save(reservation);
	}

	//레디스 카운트 감소 로직
}
