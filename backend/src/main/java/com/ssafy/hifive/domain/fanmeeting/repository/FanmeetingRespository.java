package com.ssafy.hifive.domain.fanmeeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingRespository extends JpaRepository<Fanmeeting, Long> {
	@Modifying
	@Query("""
		delete from Fanmeeting f
		where f.creator.memberId = :creatorId
		""")
	void deleteAllByCreatorId(@Param("creatorId") Long creatorId);
}
