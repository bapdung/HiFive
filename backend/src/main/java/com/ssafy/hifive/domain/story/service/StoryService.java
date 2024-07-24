package com.ssafy.hifive.domain.story.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.story.dto.param.StoryParam;
import com.ssafy.hifive.domain.story.dto.request.StoryRequestDto;
import com.ssafy.hifive.domain.story.dto.response.StoryDetailDto;
import com.ssafy.hifive.domain.story.dto.response.StoryOverviewDto;

@Service
public class StoryService {

	public void createStory(long fanmeetingId, StoryRequestDto storyRequestDto, Member member) {
	}

	public ResponseEntity<List<StoryOverviewDto>> getStoryAll(long fanmeetingId, StoryParam param, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<StoryOverviewDto>> getStorySelected(long fanmeetingId, StoryParam param, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<StoryOverviewDto>> getStoryUnselected(long fanmeetingId, StoryParam param,
		Member member) {
		return ResponseEntity.ok(null);
	}

	public void toggleStory(long storyId, Member member) {
	}

	public ResponseEntity<StoryDetailDto> getStoryDetail(long storyId, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<StoryOverviewDto>> getMyStory(long fanId, Member member) {
		return ResponseEntity.ok(null);
	}

	public void updateStory(long storyId, StoryRequestDto storyRequestDto, Member member) {
	}

	public void deleteStory(long storyId, Member member) {
	}
}
