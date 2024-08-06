package com.ssafy.hifive.domain.follow.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.creator.entity.Creator;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.follow.entity.Follow;
import com.ssafy.hifive.domain.follow.repository.FollowRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowService {
	private final FollowRepository followRepository;
	private final MemberRepository memberRepository;
	private final CreatorRepository creatorRepository;
	private final FollowValidService followValidService;

	@Transactional
	public void followCreator(long creatorId, Member member) {
		followValidService.isFollowValid(creatorId, member.getMemberId());

		Member creator = memberRepository.findById(creatorId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Creator creatorProfile = creatorRepository.findCreatorByCreatorId(creatorId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));

		Follow follow = Follow.builder()
			.creator(creator)
			.fan(member)
			.build();

		followRepository.save(follow);
		creatorProfile.updateCreatorFollowerPlus();
	}

	@Transactional
	public void unfollowCreator(long creatorId, Member member) {
		followRepository.unfollow(member.getMemberId(), creatorId);
		Creator creatorProfile = creatorRepository.findCreatorByCreatorId(creatorId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));
		creatorProfile.updateCreatorFollowerMinus();
	}
}
