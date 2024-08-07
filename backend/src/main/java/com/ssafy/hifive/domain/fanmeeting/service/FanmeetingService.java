package com.ssafy.hifive.domain.fanmeeting.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.category.entity.Category;
import com.ssafy.hifive.domain.category.repository.CategoryRepository;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.fanmeeting.dto.param.FanmeetingParam;
import com.ssafy.hifive.domain.fanmeeting.dto.request.FanmeetingRequestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingDetailDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingOverViewDto;
import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.reservation.repository.ReservationRepository;
import com.ssafy.hifive.domain.reservation.service.ReservationFanmeetingPayService;
import com.ssafy.hifive.domain.timetable.entity.Timetable;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;
import com.ssafy.hifive.domain.timetable.service.TimetableService;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FanmeetingService {

	private final FanmeetingRepository fanmeetingRepository;
	private final CategoryRepository categoryRepository;
	private final TimetableRepository timetableRepository;
	private final ReservationRepository reservationRepository;
	private final TimetableService timetableService;
	private final FanmeetingValidService fanmeetingValidService;
	private final ReservationFanmeetingPayService reservationFanmeetingPayService;
	private final CreatorRepository creatorRepository;

	public FanmeetingDetailDto getFanmeetingDetail(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findByIdWithTimetable(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		int remainingTickets = reservationFanmeetingPayService.checkRemainingTicket(fanmeeting);
		boolean isReservation = reservationRepository.checkReservation(fanmeetingId, member.getMemberId());

		return FanmeetingDetailDto.from(fanmeeting, member, remainingTickets, isReservation);
	}

	public List<FanmeetingOverViewDto> getScheduledFanmeetingAllForFan(Member member) {
		return fanmeetingRepository.findScheduledFanmeetingAllByFan(member.getMemberId(),
				"desc")
			.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());

	}

	@Transactional
	public void createFanmeeting(FanmeetingRequestDto fanmeetingRequestDto, Member member) {
		fanmeetingValidService.validateCreator(member);

		if (fanmeetingRequestDto.getTitle() == null || fanmeetingRequestDto.getTitle().isEmpty()) {
			throw new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND);
		}

		Fanmeeting fanmeeting = fanmeetingRequestDto.toEntity(member);
		fanmeetingRepository.save(fanmeeting);

		List<Timetable> timetables = fanmeetingRequestDto.getTimetable().stream()
			.map(timetableCreateDto -> {
				Category category = categoryRepository.findById(timetableCreateDto.getCategoryId())
					.orElseThrow(() -> new DataNotFoundException(ErrorCode.CATEGORY_NOT_FOUND));
				return timetableCreateDto.toEntity(fanmeeting, category);
			}).toList();

		fanmeeting.updateTimetable(timetables);
		timetableRepository.saveAll(timetables);

	}

	@Transactional
	public void updateFanmeeting(long fanmeetingId, FanmeetingRequestDto fanmeetingRequestDto, Member member) {
		fanmeetingValidService.validateCreator(member);

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		fanmeetingValidService.validateFanmeetingCreator(fanmeeting, member);

		fanmeeting.updateFanmeeting(fanmeetingRequestDto);

		List<Timetable> timetables = fanmeetingRequestDto.getTimetable().stream()
			.map(timetableCreateDto -> {
				Category category = categoryRepository.findById(timetableCreateDto.getCategoryId())
					.orElseThrow(() -> new DataNotFoundException(ErrorCode.CATEGORY_NOT_FOUND));
				return timetableCreateDto.toEntity(fanmeeting, category);
			}).collect(Collectors.toList());

		fanmeeting.updateTimetable(timetables);
		timetableRepository.saveAll(timetables);
	}

	@Transactional
	public void deleteFanmeeting(long fanmeetingId, Member member) {
		fanmeetingValidService.validateCreator(member);

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		fanmeetingValidService.validateFanmeetingCreator(fanmeeting, member);

		timetableService.deleteByTimetableId(fanmeetingId);
		fanmeetingRepository.delete(fanmeeting);
	}

	public List<FanmeetingOverViewDto> getFanmeetingAll(FanmeetingParam param) {
		System.out.println(param.getName());
		return fanmeetingRepository.findFanmeetingByCreatorName(param.getName())
			.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getFanmeetingByCreator(long creatorId) {
		return fanmeetingRepository.findByCreatorMemberId(creatorId)
			.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getScheduledFanmeetingByCreator(long creatorId) {
		return fanmeetingRepository.findByCreatorMemberIdAndStartDateAfter(creatorId,
				LocalDateTime.now())
			.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getCompletedFanmeetingByCreator(long creatorId, FanmeetingParam param) {
		LocalDateTime topDate = null;
		if (param.getTop() != null) {
			Fanmeeting fanmeeting = fanmeetingRepository.findById(param.getTop())
				.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));
			topDate = fanmeeting.getStartDate();
		}

		String sort = param.getSort() != null ? param.getSort() : "desc";

		return fanmeetingRepository.findFanmeetingsByCreatorWithScrolling(
				creatorId,
				topDate,
				sort,
				false
			)
			.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getScheduledFanmeetingForFan(Member member, FanmeetingParam param) {

		return fanmeetingRepository.findScheduledFanmeetingAllByFan(member.getMemberId(),
				param.getSort()).stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getCompletedFanmeetingForFan(Member member, FanmeetingParam param) {

		return fanmeetingRepository.findCompletedFanmeetingAllByFan(member.getMemberId(),
				param.getSort()).stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

}
