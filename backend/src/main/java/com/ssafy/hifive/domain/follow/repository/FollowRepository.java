package com.ssafy.hifive.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.follow.entity.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
	@Modifying
	@Query("""
			delete from Follow f
			where f.creator.memberId = :creatorId
		""")
	void deleteAllByCreatorId(@Param("creatorId") Long creatorId);

	@Modifying
	@Query("""
			delete from Follow f
			where f.fan.memberId = :fanId
		""")
	void deleteAllByFanId(@Param("fanId") Long fanId);
}
