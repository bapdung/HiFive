package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingRepository extends JpaRepository<Fanmeeting, Long>, FanmeetingCustomRepository {
	@Query("""
			select count(*) 
			from Fanmeeting f
			where f.creator.memberId = :creatorId
		""")
	long countByCreatorId(long creatorId);

	@EntityGraph(value = "Fanmeeting.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findByCreatorMemberId(long creatorId);

	@EntityGraph(value = "Fanmeeting.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	List<Fanmeeting> findByCreatorMemberIdAndStartDateAfter(long creatorId, LocalDateTime currentTime);

	@EntityGraph(value = "Fanmeeting.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	@Query("""
		SELECT f 
		FROM Fanmeeting f 
		LEFT JOIN FETCH f.timetable 
		WHERE f.fanmeetingId = :fanmeetingId
		""")
	Optional<Fanmeeting> findByIdWithTimetable(@Param("fanmeetingId") long fanmeetingId);

	@EntityGraph(value = "Fanmeeting.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	@Query("""
			select f from Fanmeeting f
			where DATE(f.openDate) = CURRENT_DATE
		""")
	List<Fanmeeting> getActiveFanmeetingIds();

	boolean existsByFanmeetingIdAndIsEndedTrue(Long fanMeetingId);
}
