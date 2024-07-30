package com.ssafy.hifive.domain.photo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.photo.entity.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
	@Modifying
	@Query("""
			delete from Photo p
			where p.fan.memberId = :fanId
		""")
	void deleteAllByFanId(Long fanId);

}
