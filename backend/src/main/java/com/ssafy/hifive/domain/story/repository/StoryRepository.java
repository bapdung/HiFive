package com.ssafy.hifive.domain.story.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.story.entity.Story;

public interface StoryRepository extends JpaRepository<Story, Long> {

	List<Story> findByFanmeeting_FanmeetingIdAndFan_MemberId(long fanmeetingId, long memberId);

	Page<Story> findByFanmeeting_FanmeetingId(long fanmeetingId, Pageable pageable);

	Page<Story> findByFanmeeting_FanmeetingIdAndIsPicked(long fanmeetingId, boolean isPicked, Pageable pageable);

	List<Story> findByFanmeeting_FanmeetingIdAndIsPickedTrue(long fanmeetingId);
}
