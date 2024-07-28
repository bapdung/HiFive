package com.ssafy.hifive.domain.creator.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.creator.dto.param.CreatorParam;
import com.ssafy.hifive.domain.creator.dto.request.CreatorRequestDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorOverviewDto;
import com.ssafy.hifive.domain.creator.entity.Creator;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreatorService {
	private final CreatorRepository creatorRepository;
	private final MemberRepository memberRepository;

	public List<CreatorOverviewDto> getCreatorAll(CreatorParam param, Member member) {
		return null;
	}

	public List<CreatorOverviewDto> getCreatorFollow(Member member) {
		return null;
	}

	public List<CreatorOverviewDto> getCreatorMain(Member member) {
		return null;
	}

	public CreatorOverviewDto getCreatorDetail(long creatorId, Member member) {
		return null;
	}

	@Transactional
	public void createCreator(CreatorRequestDto creatorRequestDto, Member member) {
		creatorRepository.save(creatorRequestDto.toEntity(member));
	}

	@Transactional
	public void updateCreator(CreatorRequestDto creatorRequestDto, Member member) {
		Creator creator = creatorRepository.findByMemberId(member.getMemberId())
			.orElseThrow(() -> new EntityNotFoundException()
			);
		creator.updateCreator(creatorRequestDto);
	}
}
