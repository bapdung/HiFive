package com.ssafy.hifive.domain.photo.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.photo.entity.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

	@Query("""
			select p from Photo p
			where p.fan.memberId = :memberId
		""")
	List<Photo> findByFan_MemberId(@Param("memberId") Long memberId, Sort sort);

	@Query(
		"""
			select p
			from Photo p
			join fetch p.fan
			join fetch p.fan.creatorProfile
			join fetch p.fanmeeting
			where p.fan.memberId = :fanId
				and p.fanmeeting.fanmeetingId =:fanmeetingId
			"""
	)
	List<Photo> findByFanIdAndFanmeetingId(@Param("fanId") Long fanId,
		@Param("fanmeetingId") Long fanmeetingId);

	@Query("""
			select p
			from Photo p 
			join fetch p.fan
			join fetch p.fan.creatorProfile
			join fetch p.fanmeeting
			where p.fan.memberId =:memberId
				and p.fanmeeting.fanmeetingId =:fanmeetingId 
				
		""")
	List<Photo> findCreatorPhotoByFanmeetingIdAndCreatorId(@Param("fanmeetingId") Long fanmeetingId,
		@Param("memberId") Long memberId);
}
