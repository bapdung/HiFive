package com.ssafy.hifive.domain.point.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.point.entity.Point;
import com.ssafy.hifive.domain.point.entity.TransactionType;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
	@Query("""
		select p
		from Point p
		join fetch p.member
		where p.member.memberId = :memberId
		and p.createdDate >= :createdDate
		and p.type = :type
	""")
	Page<Point> findPointTranscationByMemberIdWithPaging(@Param("memberId") long memberId, @Param("type") TransactionType transactionType,
		@Param("createdDate") LocalDateTime startDate, Pageable pageable);

}
