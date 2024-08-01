package com.ssafy.hifive.domain.story.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.story.dto.param.StoryParam;
import com.ssafy.hifive.domain.story.dto.request.StoryRequestDto;
import com.ssafy.hifive.domain.story.dto.response.StoryDetailDto;
import com.ssafy.hifive.domain.story.dto.response.StoryOverviewDto;
import com.ssafy.hifive.domain.story.entity.Story;
import com.ssafy.hifive.domain.story.repository.StoryRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;
import com.ssafy.hifive.global.util.FanmeetingValidator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryService {

	private final StoryRepository storyRepository;
	private final FanmeetingRepository fanmeetingRepository;
	private final FanmeetingValidator fanmeetingValidator;

	private final static int PAGE_SIZE = 5;

	private Pageable createPageable(StoryParam param) {
		return PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE);
	}

	private boolean isAuthorizedToViewStory(Story story, Member member) {
		return story.getFan().getMemberId() == member.getMemberId() ||
			story.getFanmeeting().getCreator().getMemberId() == member.getMemberId();
	}

	public List<StoryOverviewDto> getStoryAll(long fanmeetingId, StoryParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);
		Pageable pageable = createPageable(param);

		return storyRepository.findByFanmeeting_FanmeetingId(fanmeetingId, pageable).getContent().stream()
			.map(StoryOverviewDto::from).collect(Collectors.toList());
	}

	public List<StoryOverviewDto> getStorySelected(long fanmeetingId, StoryParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);
		Pageable pageable = createPageable(param);

		return storyRepository.findByFanmeeting_FanmeetingIdAndIsPicked(fanmeetingId, true, pageable)
			.getContent().stream().map(StoryOverviewDto::from).collect(Collectors.toList());

	}

	public List<StoryOverviewDto> getStoryUnselected(long fanmeetingId, StoryParam param, Member member) {
		fanmeetingValidator.validateCreator(fanmeetingId, member);
		Pageable pageable = createPageable(param);

		return storyRepository.findByFanmeeting_FanmeetingIdAndIsPicked(fanmeetingId, false, pageable)
			.getContent().stream().map(StoryOverviewDto::from).collect(Collectors.toList());
	}

	@Transactional
	public void createStory(long fanmeetingId, StoryRequestDto storyRequestDto, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		Story story = storyRequestDto.toEntity(member, fanmeeting);
		storyRepository.save(story);
	}

	@Transactional
	public void toggleStory(long storyId) {
		Story story = storyRepository.findById(storyId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.STORY_NOT_FOUND));
		story.toggleIsPicked();
	}

	public List<StoryOverviewDto> getMyStory(long fanmeetingId, Member member) {
		return storyRepository.findByFanmeeting_FanmeetingIdAndFan_MemberId(fanmeetingId, member.getMemberId())
			.stream().map(StoryOverviewDto::from).collect(Collectors.toList());
	}

	public StoryDetailDto getStoryDetail(long storyId, Member member) {

		Story story = storyRepository.findById(storyId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.STORY_NOT_FOUND));

		if (!isAuthorizedToViewStory(story, member)) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		return StoryDetailDto.from(story);
	}

	@Transactional
	public void updateStory(long storyId, StoryRequestDto storyRequestDto, Member member) {
		Story story = storyRepository.findById(storyId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.STORY_NOT_FOUND));

		if (story.getFan().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		story.updateStory(storyRequestDto.getTitle(), storyRequestDto.getContent());
	}

	@Transactional
	public void deleteStory(long storyId, Member member) {
		Story story = storyRepository.findById(storyId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.STORY_NOT_FOUND));

		if (story.getFan().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		storyRepository.delete(story);
	}
}
