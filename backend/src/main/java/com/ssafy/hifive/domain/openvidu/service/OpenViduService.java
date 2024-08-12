package com.ssafy.hifive.domain.openvidu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduCheckDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduTimetableDto;
import com.ssafy.hifive.domain.reservation.repository.ReservationRepository;
import com.ssafy.hifive.domain.timetable.dto.response.TimetableResponseDto;
import com.ssafy.hifive.domain.timetable.repository.TimetableRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenViduService {
	private final TimetableRepository timetableRepository;
	private final ReservationRepository reservationRepository;
	private final FanmeetingRepository fanmeetingRepository;

	public OpenViduTimetableDto getTimetableAll(Long fanmeetingId, String sessionId) {
		List<TimetableResponseDto> timetables = timetableRepository.findByFanmeeting_FanmeetingId(fanmeetingId).stream()
			.map(TimetableResponseDto::from)
			.collect(Collectors.toList());
		return OpenViduTimetableDto.from(sessionId, timetables);
	}

	public void validateMemberAndFanmeeting(OpenViduCheckDto dto, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(dto.getFanmeetingId())
			.orElseThrow(() -> new BadRequestException(ErrorCode.FANMEETING_NOT_FOUND));

		if (!reservationRepository.checkReservation(fanmeeting.getFanmeetingId(), dto.getMemberId())
			&& fanmeeting.getCreator().getMemberId() != dto.getMemberId()) {
			throw new ForbiddenException(ErrorCode.ENTER_NOT_ALLOWED);
		}
	}
	
	public void isValidMember(Long fanmeetingId, Member member) {
		Fanmeeting fanmeeting = fanmeetingRepository.findById(fanmeetingId)
			.orElseThrow(() -> new BadRequestException(ErrorCode.FANMEETING_NOT_FOUND));

		if (!reservationRepository.checkReservation(fanmeetingId, member.getMemberId())
			&& fanmeeting.getCreator().getMemberId() != member.getMemberId()) {
			throw new ForbiddenException(ErrorCode.ENTER_NOT_ALLOWED);
		}
	}

	public void isCreator(Long creatorId, Member member) {
		if (member.getMemberId() != creatorId || !member.isCreator()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}
	}

}
