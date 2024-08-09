package com.ssafy.hifive.domain.openvidu.service;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenViduSessionService {
	private final FanmeetingRepository fanmeetingRepository;
	private final RedisTemplate<String, String> redisTemplateForString;
	private final RedisTemplate<String, Integer> redisTemplateForInteger;

	public void saveSession(Long fanmeetingId, String sessionId){
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));
		String sessionkey = "fanmeeting:" + fanmeetingId + ":session";
		redisTemplateForString.opsForValue().set(sessionkey, sessionId, fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);

		saveSequence(fanmeetingId, 0);
		String sequenceKey = "fanmeeting:" + fanmeetingId + ":sequence";
		redisTemplateForInteger.opsForValue().set(sequenceKey, 0,fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);
	}

	public void saveSequence(Long fanmeetingId, Integer sequence){
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		String sequenceKey = "fanmeeting:" + fanmeetingId + ":sequence";
		redisTemplateForInteger.opsForValue().set(sequenceKey,sequence,fanmeeting.getRunningTime() + 30, TimeUnit.MINUTES);
	}

	public boolean isSessionOpen(String fanmeetingId) {
		return redisTemplateForString.hasKey("fanmeeting:" + fanmeetingId + ":session");
	}

	public void deleteSession(String fanmeetingId) {
		redisTemplateForString.delete("fanmeeting:" + fanmeetingId + ":session");
		redisTemplateForInteger.delete("fanmeeting:" + fanmeetingId + ":sequence");
	}
}
