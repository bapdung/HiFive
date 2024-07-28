package com.ssafy.hifive.domain.point.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.point.entity.Point;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
	@Modifying
	@Query("""
			delete from Point p
			where p.member.memberId = :memberId
		""")
	void deleteAllByMemberId(Long memberId);

}
