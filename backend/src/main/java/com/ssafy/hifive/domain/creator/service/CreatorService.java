package com.ssafy.hifive.domain.creator.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.creator.dto.param.CreatorParam;
import com.ssafy.hifive.domain.creator.dto.request.CreatorRequestDto;
import com.ssafy.hifive.domain.creator.dto.response.CreatorOverviewDto;
import com.ssafy.hifive.domain.member.entity.Member;

@Service
public class CreatorService {

	public ResponseEntity<List<CreatorOverviewDto>> getCreatorAll(CreatorParam param, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<CreatorOverviewDto>> getCreatorFollow(Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<CreatorOverviewDto>> getCreatorLimit(Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<CreatorOverviewDto> getCreatorDetail(long creatorId, Member member) {
		return ResponseEntity.ok(null);
	}

	public void createCreator(long memberId, CreatorRequestDto creatorRequestDto, Member member) {
		return;
	}

	public void updateCreator(CreatorRequestDto creatorRequestDto, Member member) {
		return;
	}
}
