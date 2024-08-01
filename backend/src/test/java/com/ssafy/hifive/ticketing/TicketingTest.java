package com.ssafy.hifive.ticketing;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.reservation.service.ReservationService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class TicketingTest {

	@Autowired
	private ReservationService reservationService;

	@Autowired
	private MemberRepository memberRepository;

	private static final long FANMEETING_ID = 34L;

	@BeforeEach
	public void setUp() {
		// 필요한 초기 설정
	}

	@Test
	@Transactional
	public void testConcurrentReservations() throws InterruptedException {
		int numberOfMembers = 1000;
		ExecutorService executorService = Executors.newFixedThreadPool(numberOfMembers);
		CountDownLatch latch = new CountDownLatch(numberOfMembers);

		for (long memberId = 36; memberId <= numberOfMembers; memberId++) {
			long finalMemberId = memberId;
			executorService.execute(() -> {
				try {
					Member member = memberRepository.findById(finalMemberId).get();
					reservationService.reserve(FANMEETING_ID, member);
					reservationService.pay(FANMEETING_ID, member);
				} finally {
					latch.countDown();
				}
			});
		}

		latch.await();
		executorService.shutdown();
		executorService.awaitTermination(1, TimeUnit.MINUTES);
	}
}
