package com.ssafy.hifive.domain.story.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.story.entity.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
	@Modifying
	@Query("""
			delete from Story s
			where s.fan.memberId = :fanId
		""")
	void deleteAllByFanId(@Param("fanId") Long fanId);
}
