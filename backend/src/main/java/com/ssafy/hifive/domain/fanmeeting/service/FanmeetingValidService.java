package com.ssafy.hifive.domain.fanmeeting.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FanmeetingValidService {
	private final FanmeetingRepository fanmeetingRepository;

	public void validateCreator(Member member) {
		if (!member.isCreator()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}
	}

	public LocalDateTime validateTop(Long fanmeetingId) {
		LocalDateTime topDate = null;
		if(fanmeetingId != null) {
			Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
				.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));
			topDate = fanmeeting.getStartDate();
		}
		return topDate;
	}
}
