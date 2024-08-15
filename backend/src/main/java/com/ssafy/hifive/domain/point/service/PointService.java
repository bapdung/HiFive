package com.ssafy.hifive.domain.point.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.point.dto.param.PointParam;
import com.ssafy.hifive.domain.point.dto.request.PointRequestDto;
import com.ssafy.hifive.domain.point.dto.response.PointMinusDto;
import com.ssafy.hifive.domain.point.dto.response.PointPlusDto;
import com.ssafy.hifive.domain.point.entity.Point;
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
	private final MemberRepository memberRepository;

	private Pageable createPageable(PointParam param) {
		return PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE,
			Sort.by("createdDate").descending());
	}

	private LocalDateTime getStartDate(PointParam param) {
		return pointValidService.periodSetting(param.getPeriod());
	}

	public List<PointPlusDto> getPlusTransaction(PointParam param, Member member) {

		LocalDateTime startDate = getStartDate(param);

		Pageable pageable = createPageable(param);

		Page<Point> transactionPage = pointRepository.findPointTranscationByMemberIdWithPaging(
			member.getMemberId(), TransactionType.getTransactionType("plus"), startDate, pageable);

		int totalPages = transactionPage != null ? transactionPage.getTotalPages() : 0;

		return transactionPage.getContent().stream()
			.map(transaction -> PointPlusDto.from(transaction, totalPages))
			.collect(Collectors.toList());
	}

	public List<PointMinusDto> getMinusTransaction(PointParam param, Member member) {

		LocalDateTime startDate = getStartDate(param);

		Pageable pageable = createPageable(param);

		Page<Point> transactionPage = pointRepository.findPointTranscationByMemberIdWithPaging(
			member.getMemberId(), TransactionType.getTransactionType("minus"), startDate, pageable);

		int totalPages = transactionPage != null ? transactionPage.getTotalPages() : 0;

		return transactionPage.getContent().stream()
			.map(transaction -> PointMinusDto.from(transaction, totalPages))
			.collect(Collectors.toList());
	}

	public void chargePoint(PointRequestDto pointRequestDto, Member member) {
		member.updatePoint(pointRequestDto.getMoney() + member.getPoint());
		memberRepository.save(member);
		pointRepository.save(pointRequestDto.toEntity(member));
	}
}
