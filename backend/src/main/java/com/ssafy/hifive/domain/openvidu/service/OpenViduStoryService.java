package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduStoryDto;
import com.ssafy.hifive.domain.story.entity.Story;
import com.ssafy.hifive.domain.story.repository.StoryRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenViduStoryService {

	private final StoryRepository storyRepository;
	private final RedisTemplate<String, Object> redisTemplate;
	private final FanmeetingRepository fanmeetingRepository;

	private String getRedisKey(long fanmeetingId) {
		return "fanmeeting:" + fanmeetingId + ":story";
	}

	public void getStories(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		if (fanmeeting.getCreator().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		List<Story> storyList = storyRepository.findByFanmeeting_FanmeetingIdAndIsPickedTrue(fanmeetingId);

		if (storyList.isEmpty()) {
			throw new DataNotFoundException(ErrorCode.STORY_NOT_FOUND);
		}

		List<OpenViduStoryDto> stories = storyList.stream()
			.map(story -> OpenViduStoryDto.from(story, storyList.size()))
			.collect(Collectors.toList());

		redisTemplate.opsForValue()
			.set(getRedisKey(fanmeetingId), stories, fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);

	}

	public OpenViduStoryDto getStoryBySequence(long fanmeetingId, int sequence, Member member) {

		String redisKey = getRedisKey(fanmeetingId);
		List<OpenViduStoryDto> stories = (List<OpenViduStoryDto>)redisTemplate.opsForValue().get(redisKey);

		int adjustedSequence = sequence - 1;

		if (stories == null || adjustedSequence < 0 || adjustedSequence >= stories.size()) {
			throw new DataNotFoundException(ErrorCode.STORY_NOT_FOUND);
		}

		return stories.get(adjustedSequence);
	}

}
