package com.ssafy.hifive.ticketing;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.fanmeeting.service.FanmeetingSchedulerService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ActiveFanmeetingTest {

	@Autowired
	private FanmeetingSchedulerService scheduler;

	@Autowired
	private FanmeetingRepository fanmeetingRepository;

	@Test
	public void testUpdateActiveFanmeetingsId() {
		fanmeetingRepository.getActiveFanmeetingIds();
		scheduler.updateActiveFanmeetingsId();

		List<Long> expectedIds = Arrays.asList(32L, 33L, 34L);
		assertEquals(expectedIds, scheduler.getActiveFanmeetingIds());
	}
}
