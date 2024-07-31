package com.ssafy.hifive.domain.point.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.point.dto.param.PointParam;
import com.ssafy.hifive.domain.point.dto.request.PointRequestDto;
import com.ssafy.hifive.domain.point.dto.response.PointMinusDto;
import com.ssafy.hifive.domain.point.dto.response.PointPlusDto;
import com.ssafy.hifive.domain.point.entity.TransactionType;
import com.ssafy.hifive.domain.point.repository.PointRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PointService {
	private final PointRepository pointRepository;
	private final PointValidService pointValidService;

	private final static int PAGE_SIZE = 6;

	public List<PointPlusDto> getPlusTransaction(PointParam param, Member member) {

		LocalDateTime startDate = pointValidService.periodSetting(param.getPeriod());

		Pageable pageable = PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE,
			Sort.by("createdDate").descending());

		TransactionType transactionType = TransactionType.getTransactionType("plus");

		log.info(transactionType.toString());

		return pointRepository.findPointTranscationByMemberIdWithPaging(member.getMemberId(), transactionType, startDate, pageable)
			.getContent()
			.stream()
			.map(PointPlusDto::from)
			.collect(Collectors.toList());
	}

	public List<PointMinusDto> getMinusTransaction(PointParam param, Member member) {

		LocalDateTime startDate = pointValidService.periodSetting(param.getPeriod());

		Pageable pageable = PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE,
			Sort.by("createdDate").descending());

		TransactionType transactionType = TransactionType.getTransactionType("minus");

		return pointRepository.findPointTranscationByMemberIdWithPaging(member.getMemberId(), transactionType, startDate, pageable)
			.getContent()
			.stream()
			.map(PointMinusDto::from)
			.collect(Collectors.toList());
	}

	public void chargePoint(PointRequestDto pointRequestDto, Member member) {
		pointRepository.save(pointRequestDto.toEntity(member));
	}

}
