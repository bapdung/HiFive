package com.ssafy.hifive.domain.reservation.service;

import java.util.concurrent.TimeUnit;

import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationLockFacadeService {
	private final RedissonClient redissonClient;
	private final ReservationService reservationService;

	public void pay(long fanmeetingId, Member member) {
		String lockKey = "fanmeeting:" + fanmeetingId + ":lock";
		RLock lock = redissonClient.getLock(lockKey);

		try{
			if(lock.tryLock(20, 60, TimeUnit.SECONDS)){
				reservationService.pay(fanmeetingId, member);
			} else {
				throw new BadRequestException(ErrorCode.NOT_ACQUIRE_LOCK);
			}
		} catch (InterruptedException e){
			Thread.currentThread().interrupt();
			throw new BadRequestException(ErrorCode.NOT_ACQUIRE_LOCK);
		} finally {
			if (lock.isHeldByCurrentThread()) {
				lock.unlock();
			}
		}
	}

}
