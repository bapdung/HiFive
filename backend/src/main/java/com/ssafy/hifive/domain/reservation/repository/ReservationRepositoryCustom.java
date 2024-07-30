package com.ssafy.hifive.domain.reservation.repository;

public interface ReservationRepositoryCustom {
	boolean checkReservation(long fanmeetingId, long fanId);
}
