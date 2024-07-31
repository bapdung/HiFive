package com.ssafy.hifive.domain.creator.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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

	@Query("""
		    select c from Creator c
		    where (:name is null or c.creatorName like %:name%)
		    AND (
		        (:condition = 'createDate' and (:topId is null or (:sort = 'desc' and c.creatorProfileId < :topId) or (:sort = 'asc' and c.creatorProfileId > :topId)))
		        OR
		        (:condition = 'creatorName' and (:topName is null or (:sort = 'desc' and c.creatorName < :topName) or (:sort = 'asc' and c.creatorName > :topName)))
		    )
		""")
	Slice<Creator> findCreatorsWithScrolling(@Param("name") String name,
		@Param("topId") Long topId,
		@Param("topName") String topName,
		@Param("condition") String condition,
		@Param("sort") String sort,
		Pageable pageable);

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
