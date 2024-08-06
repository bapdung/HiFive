package com.ssafy.hifive.domain.follow.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.follow.repository.FollowRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowValidService {
	private final FollowRepository followRepository;

	public void isFollowValid(long creatorId, long followerId) {
		if(followRepository.existsByCreatorIdAndFanId(creatorId, followerId)){
			throw new ForbiddenException(ErrorCode.ALREADY_FOLLOWING);
		}
	}
}
