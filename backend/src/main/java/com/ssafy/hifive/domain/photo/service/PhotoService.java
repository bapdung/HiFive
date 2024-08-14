package com.ssafy.hifive.domain.photo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.fanmeeting.repository.FanmeetingRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.photo.dto.param.PhotoParam;
import com.ssafy.hifive.domain.photo.dto.response.PhotoOverViewDto;
import com.ssafy.hifive.domain.photo.dto.response.PhotoUrlDto;
import com.ssafy.hifive.domain.photo.entity.Photo;
import com.ssafy.hifive.domain.photo.repository.PhotoRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService {

	private final PhotoRepository photoRepository;
	private final FanmeetingRepository fanmeetingRepository;
	private final MemberRepository memberRepository;

	public List<PhotoOverViewDto> getPhotos(Member member, PhotoParam param) {
		List<Fanmeeting> fanmeetings = fanmeetingRepository.findCompletedFanmeetingAllByFan(member.getMemberId(),
			"desc");
		return fanmeetings.stream()
			.map(fanmeeting -> {
				return PhotoOverViewDto.from(fanmeeting, createPhotoUrlDtos(fanmeeting, member.getMemberId()));
			})
			.collect(Collectors.toList());
	}

	private List<PhotoUrlDto> createPhotoUrlDtos(Fanmeeting fanmeeting, Long memberId) {
		List<Photo> fanPhotos = photoRepository.findByFanIdAndFanmeetingId(memberId, fanmeeting.getFanmeetingId());
		List<Photo> creatorPhotos = photoRepository.findCreatorPhotoByFanmeetingIdAndCreatorId(
			fanmeeting.getFanmeetingId(), fanmeeting.getCreator().getMemberId());

		List<PhotoUrlDto> photoUrlDtos = new ArrayList<>();
		for (int i = 0; i < fanPhotos.size(); i++) {
			Photo fanPhoto = fanPhotos.get(i);
			Photo creatorPhoto = creatorPhotos.get(i);
			photoUrlDtos.add(new PhotoUrlDto(creatorPhoto.getPhotoImg(), fanPhoto.getPhotoImg()));
		}
		return photoUrlDtos;
	}

	public void save(String userId, String sessionId, String s3Url, int sequence) {
		Member member = memberRepository.findById(Long.parseLong(userId))
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Fanmeeting fanmeeting = fanmeetingRepository.findById(Long.parseLong(sessionId))
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.FANMEETING_NOT_FOUND));

		photoRepository.save(Photo.builder()
			.fan(member)
			.fanmeeting(fanmeeting)
			.photoImg(s3Url)
			.sequence(sequence)
			.build());
	}
}
