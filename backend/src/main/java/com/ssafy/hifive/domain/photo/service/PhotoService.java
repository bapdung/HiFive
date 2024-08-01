package com.ssafy.hifive.domain.photo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.photo.dto.response.PhotoOverViewDto;
import com.ssafy.hifive.domain.photo.entity.Photo;
import com.ssafy.hifive.domain.photo.repository.PhotoRepository;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {

	private final PhotoRepository photoRepository;

	public List<PhotoOverViewDto> getPhotosByFanmeeting(long fanmeetingId, Member member) {
		List<Photo> photos = photoRepository.findByFanmeeting_FanmeetingIdAndFan_MemberId(fanmeetingId,
			member.getMemberId());

		if (photos.isEmpty()) {
			throw new DataNotFoundException(ErrorCode.PHOTO_NOT_FOUND);
		}

		return photos.stream()
			.map(photo -> PhotoOverViewDto.from(photo, photo.getFanmeeting()))
			.collect(Collectors.toList());
	}

}
