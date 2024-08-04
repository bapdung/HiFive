package com.ssafy.hifive.domain.creator.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.creator.entity.Creator;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long>, CreatorCustomRepository{

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
			join fetch Follow f on c.creator.memberId = f.creator.memberId
			WHERE f.fan.memberId = :fanId
		""")
	List<Creator> findFollowCreatorByFanId(@Param("fanId") Long fanId);

	@Query("""
			select c
		    from Creator c
		    left join Follow f on f.creator.memberId = c.creator.memberId and f.fan.memberId = :fanId
		    where f.fan is null
		""")
	List<Creator> findUnfollowCreatorByFanId(@Param("fanId") Long fanId, Pageable pageable);

	@Query("""
			select c
			from Creator c
			where c.creator.memberId = :creatorId
		""")
	Optional<Creator> findCreatorByCreatorId(@Param("creatorId") long creatorId);

	@Modifying
	@Query("""
			delete from Creator c
			where c.creator.memberId = :creatorId
		""")
	void deleteByCreatorId(@Param("creatorId") long creatorId);
}
