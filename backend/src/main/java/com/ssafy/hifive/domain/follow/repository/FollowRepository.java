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
		where f.creator.memberId = :creatorId and f.fan.memberId = :fanId
	""")
	void unfollow(@Param("fanId") Long fanId, @Param("creatorId") Long creatorId);

	@Query("""
		SELECT CASE WHEN COUNT(f) > 0 
		THEN true ELSE false END 
		FROM Follow f 
		WHERE f.creator.memberId = :creatorId AND f.fan.memberId = :fanId
	""")
	boolean existsByCreatorIdAndFanId(Long creatorId, Long fanId);
}
