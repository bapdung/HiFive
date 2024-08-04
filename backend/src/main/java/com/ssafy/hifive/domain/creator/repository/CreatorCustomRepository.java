package com.ssafy.hifive.domain.creator.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.creator.entity.Creator;

@Repository
public interface CreatorCustomRepository {

	List<Creator> findCreatorByCreatedDateWithScrolling(String sort, String keyword, LocalDateTime top);

	List<Creator> findCreatorByCreatorNameWithScrolling(String sort, String keyword, String top);
}


