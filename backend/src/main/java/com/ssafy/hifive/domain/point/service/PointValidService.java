package com.ssafy.hifive.domain.point.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

@Service
public class PointValidService {

	public LocalDateTime periodSetting(Integer period) {
		if(period == null){
			return LocalDateTime.now().minusMonths(12);
		} else {
			return LocalDateTime.now().minusMonths(period);
		}
	}
}
