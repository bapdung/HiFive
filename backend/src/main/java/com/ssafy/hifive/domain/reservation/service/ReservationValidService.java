package com.ssafy.hifive.domain.reservation.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

@Service
public class ReservationValidService {
	public void ReservationIsValid(int remainingTicket) {
		if(remainingTicket <= 0) {
			throw new BadRequestException(ErrorCode.TICKET_SOLD_OUT);
		}
	}
}
