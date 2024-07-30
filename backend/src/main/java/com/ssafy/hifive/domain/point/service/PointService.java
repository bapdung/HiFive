package com.ssafy.hifive.domain.point.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.point.dto.param.PointParam;
import com.ssafy.hifive.domain.point.dto.response.PointResponseDto;

@Service
public class PointService {

	public ResponseEntity<List<PointResponseDto>> getTransactionAll(PointParam param, Member member) {
		return ResponseEntity.ok(null);
	}

}
