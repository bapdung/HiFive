package com.ssafy.hifive.domain.creator.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.creator.entity.Creator;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long> {

	@Query("""
			select c
			from Creator c
			join fetch c.creator
			where c.creator.memberId = :creatorId
		""")
	Optional<Creator> findByMemberId(@Param("creatorId") long creatorId);

	@Modifying
	@Query("""
			delete from Creator c
			where c.creator.memberId = :creatorId
		""")
	void deleteByCreatorId(@Param("creatorId") long creatorId);
}
