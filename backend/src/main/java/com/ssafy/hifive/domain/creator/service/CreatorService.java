package com.ssafy.hifive.domain.creator.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.board.repository.BoardRepository;
import com.ssafy.hifive.domain.creator.dto.param.CreatorParam;
import com.ssafy.hifive.domain.creator.dto.request.CreatorRequestDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorDetailDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorMainDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorOverviewDto;
import com.ssafy.hifive.domain.creator.entity.Creator;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.follow.repository.FollowRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreatorService {
	private static final int PAGE_SIZE = 30;
	private final CreatorRepository creatorRepository;
	private final FanmeetingRepository fanmeetingRepository;
	private final FollowRepository followRepository;
	private final BoardRepository boardRepository;

	public List<CreatorOverviewDto> getCreatorAll(CreatorParam param) {
		String condition = param.getCondition() != null ? param.getCondition() : "creatorName";
		String sort = param.getSort() != null ? param.getSort() : "asc";

		Pageable pageable = PageRequest.of(0, PAGE_SIZE,
			sort.equalsIgnoreCase("desc") ? Sort.by(condition).descending() : Sort.by(condition).ascending());

		return creatorRepository.findCreatorsWithScrolling(param.getName(), param.getTopId(), param.getTopName(),
				condition, sort, pageable)
			.getContent().stream()
			.map(CreatorOverviewDto::from)
			.collect(Collectors.toList());
	}

	public List<CreatorOverviewDto> getCreatorFollow(Member member) {
		return creatorRepository.findFollowCreatorByFanId(member.getMemberId())
			.stream()
			.map(CreatorOverviewDto::from)
			.collect(Collectors.toList());
	}

	public CreatorMainDto getCreatorMain(Member member) {
		List<CreatorOverviewDto> follow = creatorRepository.findFollowCreatorByFanId(member.getMemberId())
			.stream()
			.map(CreatorOverviewDto::from)
			.limit(6)
			.collect(Collectors.toList());

		List<CreatorOverviewDto> unfollow = new ArrayList<>();
		if (follow.size() < 6) {
			int needed = 6 - follow.size();
			Pageable pageable = PageRequest.of(0, needed);
			unfollow = creatorRepository.findUnfollowCreatorByFanId(member.getMemberId(), pageable)
				.stream()
				.map(CreatorOverviewDto::from)
				.collect(Collectors.toList());
		}

		return new CreatorMainDto(follow, unfollow);
	}

	public CreatorDetailDto getCreatorDetail(long creatorId, Member member) {
		Creator creator = creatorRepository.findCreatorByCreatorId(creatorId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));
		long fanmeetingCount = fanmeetingRepository.countByCreatorId(creatorId);
		long boardCount = boardRepository.countByCreatorId(creatorId);

		return CreatorDetailDto.from(creator, boardCount, fanmeetingCount);
	}

	@Transactional
	public void createCreator(CreatorRequestDto creatorRequestDto, Member member) {
		creatorRepository.save(creatorRequestDto.toEntity(member));
	}

	@Transactional
	public void updateCreator(CreatorRequestDto creatorRequestDto, Member member) {
		if (!member.isCreator())
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);

		Creator creator = creatorRepository.findByMemberId(member.getMemberId())
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.CREATOR_NOT_FOUND));

		creator.updateCreator(creatorRequestDto.getLink(), creatorRequestDto.getDescription());
	}
}
