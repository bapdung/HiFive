package com.ssafy.hifive.domain.follow.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowService {

	@Transactional
	public void followCreator(long creatorId, Member member) {
	}

	@Transactional
	public void unfollowCreator(long creatorId, Member member) {
	}
}
