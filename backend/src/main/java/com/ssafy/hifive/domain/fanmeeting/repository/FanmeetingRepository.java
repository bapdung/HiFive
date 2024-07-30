package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingRepository extends JpaRepository<Fanmeeting, Long> {
	@Query("""
			select count(*) 
			from Fanmeeting f
			where f.creator.memberId = :creatorId
		""")
	long countByCreatorId(long creatorId);

	Optional<Fanmeeting> findTopByOrderByStartDateDesc();

	List<Fanmeeting> findByCreatorMemberId(long creatorId);

	List<Fanmeeting> findByCreatorMemberIdAndStartDateAfter(long creatorId, LocalDateTime currentTime);

	@Query("""
		SELECT f 
		FROM Fanmeeting f 
		LEFT JOIN FETCH f.timetable 
		WHERE f.fanmeetingId = :fanmeetingId
		""")
	Optional<Fanmeeting> findByIdWithTimetable(@Param("fanmeetingId") long fanmeetingId);

	@Query("""
		    SELECT f FROM Fanmeeting f
		    WHERE f.creator.memberId = :creatorId AND f.startDate <= CURRENT_TIMESTAMP
		    AND (:top IS NULL OR (:sort = 'desc' AND f.fanmeetingId < :top) OR (:sort = 'asc' AND f.fanmeetingId > :top))
		""")
	Slice<Fanmeeting> findCompletedFanmeetingsByCreatorWithScrolling(
		@Param("creatorId") long creatorId,
		@Param("top") Long top,
		@Param("sort") String sort,
		Pageable pageable);

}
