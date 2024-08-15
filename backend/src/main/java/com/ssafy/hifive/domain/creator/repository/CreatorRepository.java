package com.ssafy.hifive.domain.creator.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.creator.entity.Creator;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long>, CreatorCustomRepository {

	@Query("""
			select c
			from Creator c
			join fetch c.creator
			where c.creator.memberId = :creatorId
		""")
	Optional<Creator> findByMemberId(@Param("creatorId") long creatorId);

	@Query("""
			select c
			from Creator c
			join fetch c.creator m
			join fetch Follow f on m.memberId = f.creator.memberId
			where f.fan.memberId = :fanId
		""")
	List<Creator> findFollowCreatorByFanId(@Param("fanId") Long fanId);

	@Query("""
			select c
			from Creator c
			where c.creator.memberId = :creatorId
		""")
	Optional<Creator> findCreatorByCreatorId(@Param("creatorId") long creatorId);

	@Query("""
			select c
			from Creator c
			order by c.follower desc
		""")
	List<Creator> findTopCreators(Pageable pageable);
}
