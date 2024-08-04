package com.ssafy.hifive.domain.fanmeeting.repository;

import static com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting.*;
import static com.ssafy.hifive.domain.reservation.entity.QReservation.*;

import java.time.LocalDateTime;
import java.util.List;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FanmeetingCustomRepositoryImpl implements FanmeetingCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Fanmeeting> findScheduledFanmeetingAllByFan(long fanId, String sort) {
		OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort);

		return jpaQueryFactory.selectFrom(fanmeeting)
			.join(reservation).on(reservation.fanmeeting.fanmeetingId.eq(fanmeeting.fanmeetingId))
			.where(
				isScheduledFanmeeting(true),
				getFromFanId(fanId)
			)
			.orderBy(orderSpecifier)
			.fetch();
	}

	@Override
	public List<Fanmeeting> findFanmeetingsByCreatorWithScrolling(long creatorId,
		LocalDateTime top,
		String sort,
		boolean isScheduled) {

		OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort);

		return jpaQueryFactory.selectFrom(fanmeeting)
			.where(
				fanmeeting.creator.memberId.eq(creatorId),
				isScheduledFanmeeting(isScheduled),
				afterCursor(top, sort)
			)
			.orderBy(orderSpecifier)
			.limit(10)
			.fetch();
	}

	@Override
	public List<Fanmeeting> findCompletedFanmeetingAllByFan(long fanId, String sort) {
		OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort);

		return jpaQueryFactory.selectFrom(fanmeeting)
			.join(reservation).on(reservation.fanmeeting.fanmeetingId.eq(fanmeeting.fanmeetingId))
			.where(
				isScheduledFanmeeting(false),
				getFromFanId(fanId)
			)
			.orderBy(orderSpecifier)
			.fetch();
	}

	private BooleanExpression isScheduledFanmeeting(boolean isScheduled) {
		if (isScheduled) {
			return fanmeeting.startDate.goe(LocalDateTime.now());
		} else {
			return fanmeeting.startDate.loe(LocalDateTime.now());
		}
	}

	private BooleanExpression getFromFanId(Long fanId) {
		return reservation.fan.memberId.eq(fanId);
	}

	private BooleanExpression afterCursor(LocalDateTime top, String sort) {
		if (top == null) {
			return null;
		} else if (sort.equals("asc")) {
			return fanmeeting.startDate.gt(top);
		} else {
			return fanmeeting.startDate.lt(top);
		}
	}

	private OrderSpecifier<LocalDateTime> getOrderSpecifier(String sort) {
		if (sort == null || sort.equalsIgnoreCase("desc")) {
			return fanmeeting.startDate.desc();
		} else {
			return fanmeeting.startDate.asc();
		}
	}
}
