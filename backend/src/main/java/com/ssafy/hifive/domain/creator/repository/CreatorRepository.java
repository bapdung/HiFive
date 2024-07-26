package com.ssafy.hifive.domain.creator.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.hifive.domain.creator.entity.Creator;

public interface CreatorRepository extends JpaRepository<Creator, Long> {

	@Query("""
			SELECT c
			FROM Creator c
			JOIN FETCH c.creator
			WHERE c.creator.memberId = :creatorId
		""")
	Optional<Creator> findByMemberId(@Param("creatorId") long creatorId);
}
