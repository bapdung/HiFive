package com.ssafy.hifive.domain.member.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.auth.repository.TokenRepository;
import com.ssafy.hifive.domain.board.repository.BoardRepository;
import com.ssafy.hifive.domain.comment.repository.CommentRepository;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.follow.repository.FollowRepository;
import com.ssafy.hifive.domain.member.dto.request.MemberIdentificationDto;
import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.request.MemberUpdateDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.photo.repository.PhotoRepository;
import com.ssafy.hifive.domain.point.repository.PointRepository;
import com.ssafy.hifive.domain.question.repository.QuestionRepository;
import com.ssafy.hifive.domain.reservation.repository.ReservationRepository;
import com.ssafy.hifive.domain.story.repository.StoryRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final CreatorRepository creatorRepository;
	private final TokenRepository tokenRepository;
	private final FollowRepository followRepository;
	private final PointRepository pointRepository;
	private final PhotoRepository photoRepository;
	private final QuestionRepository questionRepository;
	private final FanmeetingRepository fanmeetingRepository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;
	private final StoryRepository storyRepository;
	private final ReservationRepository reservationRepository;
	private final MemberValidService memberValidService;

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
	}

	public MemberResponseDto getMemberDetail(Member member) {
		return MemberResponseDto.from(member);
	}

	public void checkNickName(MemberNicknameDto memberNicknameDto) {
		memberValidService.isValidNicknameLength(memberNicknameDto.getNickname());
		memberValidService.isValidNicknameSpecailSymbol(memberNicknameDto.getNickname());
		memberValidService.isValidDuplicate(memberNicknameDto.getNickname());
	}

	@Transactional
	public void updateMember(MemberUpdateDto memberUpdateDto, Member member) {
		member.updateMember(memberUpdateDto.getProfileImg(), memberUpdateDto.getNickname());
	}

	@Transactional
	public void createIdentification(MemberIdentificationDto memberIdentificationDto, Member member) {
		member.updateIdentification(memberIdentificationDto.getIdentificationImg());
	}

	@Transactional
	public void deleteMember(Member member) {
		member.deleteMember();
		memberRepository.save(member);
	}
}
