package com.ssafy.hifive.domain.reservation.repository;

import static com.ssafy.hifive.domain.reservation.entity.QReservation.*;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReservationRepositoryCustomImpl implements ReservationRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public boolean checkReservation(long fanmeeetingId, long fanId) {
		Integer count = queryFactory
			.selectOne()
			.from(reservation)
			.where(
				reservation.fanmeeting.fanmeetingId.eq(fanmeeetingId)
					.and(reservation.fan.memberId.eq(fanId))
			)
			.fetchFirst();
		return count != null;
	}

}
