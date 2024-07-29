package com.ssafy.hifive.domain.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.reservation.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	@Modifying
	@Query("""
			delete from Reservation r
			where r.fan.memberId = :fanId
		""")
	void deleteAllByFanId(@Param("fanId") Long fanId);

}
