package com.ssafy.hifive.domain.creator.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.creator.entity.Creator;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreatorConditionService {
	private final CreatorRepository creatorRepository;

	public List<Creator> getCreators(Long creatorId, String condition, String name, String sort) {
		if(creatorId != null && condition.equals("creatorName")) {
			String top = null;
			if(creatorId != null) {
				Creator creator = creatorRepository.findCreatorByCreatorId(creatorId)
					.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));
				top = creator.getCreatorName();
			}
			return creatorRepository.findCreatorByCreatorNameWithScrolling(sort, name, top);
		} else if (creatorId != null && condition.equals("createdDate")) {
			LocalDateTime top = null;
			if(creatorId != null){
				Creator creator = creatorRepository.findCreatorByCreatorId(creatorId)
					.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));
				top = creator.getCreatedDate();
			}
			return creatorRepository.findCreatorByCreatedDateWithScrolling(sort, name, top);
		} else if(creatorId == null && condition.equals("createdDate")) {
			return creatorRepository.findCreatorByCreatedDateWithScrolling(sort, name, null);
		} else {
			return creatorRepository.findCreatorByCreatorNameWithScrolling(sort, name, null);
		}
	}
}
