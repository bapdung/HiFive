package com.ssafy.hifive.domain.fanmeeting.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.dto.param.FanmeetingParam;
import com.ssafy.hifive.domain.fanmeeting.dto.request.FanmeetingRequestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingDetailDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingLatestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingOverViewDto;
import com.ssafy.hifive.domain.member.entity.Member;

@Service
public class FanmeetingService {

	public ResponseEntity<FanmeetingDetailDto> getFanmeetingDetail(long fanmeetingId, Member member) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<FanmeetingLatestDto> getLatestFanmeeting() {
		return ResponseEntity.ok(null);
	}

	public void createFanmeeting(FanmeetingRequestDto fanmeetingRequestDto, Member member) {
	}

	public void updateFanmeeting(long fanmeetingId, FanmeetingRequestDto fanmeetingRequestDto, Member member) {
	}

	public void deleteFanmeeting(long fanmeetingId, Member member) {
	}

	public ResponseEntity<List<FanmeetingOverViewDto>> getAllFanmeetings() {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<FanmeetingOverViewDto>> getFanmeetingsByCreator(long creatorId) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<FanmeetingOverViewDto>> getScheduledFanmeetingsByCreator(long creatorId) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<FanmeetingOverViewDto>> getCompletedFanmeetingsByCreator(long creatorId,
		FanmeetingParam param) {
		return ResponseEntity.ok(null);
	}

	public ResponseEntity<List<FanmeetingOverViewDto>> getFanmeetingsForUser(FanmeetingParam param) {
		return ResponseEntity.ok(null);
	}
}
