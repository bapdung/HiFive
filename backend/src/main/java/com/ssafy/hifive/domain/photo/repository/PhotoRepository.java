package com.ssafy.hifive.domain.photo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.photo.entity.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

	List<Photo> findByFan_MemberId(Long memberId);
}
