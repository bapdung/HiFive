package com.ssafy.hifive.domain.member.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.auth.repository.TokenRepository;
import com.ssafy.hifive.domain.board.repository.BoardRepository;
import com.ssafy.hifive.domain.comment.repository.CommentRepository;
import com.ssafy.hifive.domain.creator.repository.CreatorRepository;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRespository;
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
	private final FanmeetingRespository fanmeetingRespository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;
	private final StoryRepository storyRepository;
	private final ReservationRepository reservationRepository;

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.MEMBER_NOT_FOUND, "유효하지 않은 email입니다."));
	}

	public MemberResponseDto getMemberDetail(Member member) {
		return MemberResponseDto.from(member);
	}

	public ResponseEntity<String> nicknameCheck(MemberNicknameDto memberNicknameDto) {
		if (memberNicknameDto.getNickname().length() < 2 || memberNicknameDto.getNickname().length() > 10) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("닉네임은 최소 2글자에서 최대 10글자 이내여야 합니다.");
		}

		String regex = "[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(memberNicknameDto.getNickname());
		boolean isInvaild = matcher.find();

		if (isInvaild) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("닉네임에 특수문자를 포함할 수 없습니다.");
		}

		boolean isDuplicate = memberRepository.existsByNickname(memberNicknameDto.getNickname());

		if (isDuplicate) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("중복되는 닉네임이 존재합니다.");
		}

		return ResponseEntity.ok("사용 가능한 닉네임입니다.");
	}

	@Transactional
	public void updateMember(MemberUpdateDto memberUpdateDto, Member member) {
		member.updateMember(memberUpdateDto);
		memberRepository.save(member);
	}

	@Transactional
	public void createIdentification(MemberIdentificationDto memberIdentificationDto, Member member) {
		member.updateIdentification(memberIdentificationDto);
	}

	@Transactional
	public void deleteMember(Member member) {
		memberRepository.deleteById(member.getMemberId());
		tokenRepository.deleteByMemberId(member.getMemberId());
		creatorRepository.deleteByCreatorId(member.getMemberId());
		followRepository.deleteAllByFanId(member.getMemberId());
		followRepository.deleteAllByCreatorId(member.getMemberId());
		boardRepository.deleteAllByCreatorId(member.getMemberId());
		commentRepository.deleteAllByMemberId(member.getMemberId());
		storyRepository.deleteAllByFanId(member.getMemberId());
		reservationRepository.deleteAllByFanId(member.getMemberId());
		photoRepository.deleteAllByFanId(member.getMemberId());
		questionRepository.deleteAllByFanId(member.getMemberId());
		pointRepository.deleteAllByMemberId(member.getMemberId());
		fanmeetingRespository.deleteAllByCreatorId(member.getMemberId());
		memberRepository.delete(member);
	}
}
