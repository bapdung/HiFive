package com.ssafy.hifive.domain.fanmeeting.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.category.entity.Category;
import com.ssafy.hifive.domain.category.repository.CategoryRepository;
import com.ssafy.hifive.domain.fanmeeting.dto.param.FanmeetingParam;
import com.ssafy.hifive.domain.fanmeeting.dto.request.FanmeetingRequestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingDetailDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingLatestDto;
import com.ssafy.hifive.domain.fanmeeting.dto.response.FanmeetingOverViewDto;
import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.timetable.entity.Timetable;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;
import com.ssafy.hifive.domain.timetable.service.TimetableService;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FanmeetingService {

	private final FanmeetingRepository fanmeetingRepository;
	private final CategoryRepository categoryRepository;
	private final TimetableRepository timetableRepository;
	private final TimetableService timetableService;

	private void validateCreator(Member member) {
		if (!member.isCreator()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}
	}

	private final static int PAGE_SIZE = 30;

	private Pageable createPageable(FanmeetingParam param) {
		return PageRequest.of(0, PAGE_SIZE,
			Sort.by(Sort.Direction.fromString(param.getSort()), "startDate"));

	}

	private void validateFanmeetingCreator(Fanmeeting fanmeeting, Member member) {
		if (fanmeeting.getCreator().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}
	}

	public FanmeetingDetailDto getFanmeetingDetail(long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findByIdWithTimetable(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		// 티켓 잔여 확인 로직 -> 레디스 확인
		int remainingTickets = fanmeeting.getParticipant();

		return FanmeetingDetailDto.from(fanmeeting, remainingTickets);
	}

	public FanmeetingLatestDto getLatestFanmeeting() {
		Fanmeeting latestFanmeeting = fanmeetingRepository.findTopByOrderByStartDateDesc()
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		return FanmeetingLatestDto.from(latestFanmeeting);
	}

	@Transactional
	public void createFanmeeting(FanmeetingRequestDto fanmeetingRequestDto, Member member) {
		validateCreator(member);

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

		for (Timetable timetable : timetables) {
			log.info(timetable.toString());
		}
		fanmeeting.updateTimetable(timetables);
		timetableRepository.saveAll(timetables);

	}

	@Transactional
	public void updateFanmeeting(long fanmeetingId, FanmeetingRequestDto fanmeetingRequestDto, Member member) {
		validateCreator(member);

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		validateFanmeetingCreator(fanmeeting, member);

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
		validateCreator(member);

		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		validateFanmeetingCreator(fanmeeting, member);

		timetableService.deleteByTimetableId(fanmeetingId);
		fanmeetingRepository.delete(fanmeeting);
	}

	public List<FanmeetingOverViewDto> getFanmeetingAll() {
		List<Fanmeeting> fanmeetings = fanmeetingRepository.findAll();
		return fanmeetings.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getFanmeetingByCreator(long creatorId) {
		List<Fanmeeting> fanmeetings = fanmeetingRepository.findByCreatorMemberId(creatorId);
		return fanmeetings.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getScheduledFanmeetingByCreator(long creatorId) {
		List<Fanmeeting> fanmeetings = fanmeetingRepository.findByCreatorMemberIdAndStartDateAfter(creatorId,
			LocalDateTime.now());
		return fanmeetings.stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	public List<FanmeetingOverViewDto> getCompletedFanmeetingByCreator(long creatorId, FanmeetingParam param) {

		String sort = param.getSort() != null ? param.getSort() : "asc";

		Slice<Fanmeeting> fanmeetings = fanmeetingRepository.findCompletedFanmeetingsByCreatorWithScrolling(
			creatorId,
			param.getTop(),
			sort,
			createPageable(param)
		);
		return fanmeetings.getContent().stream()
			.map(FanmeetingOverViewDto::from)
			.collect(Collectors.toList());
	}

	// todo : reservation 작업 후 연결
	// public List<FanmeetingOverViewDto> getFanmeetingForUser(FanmeetingParam param) {
	//
	// 	Slice<Fanmeeting> fanmeetings = fanmeetingRepository.findFanmeetingsForUserWithScrolling(
	// 		param.getTop(),
	// 		param.getSort(),
	// 		createPageable(param));
	//
	// 	return fanmeetings.stream()
	// 		.map(FanmeetingOverViewDto::from)
	// 		.collect(Collectors.toList());
	// }
}
