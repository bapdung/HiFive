package com.ssafy.hifive.domain.photo.service;

import java.util.ArrayList;
import java.util.List;

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

	public List<PhotoOverViewDto> getPhotosByMember(Member member) {

		List<Photo> photos = photoRepository.findByFan_MemberId(member.getMemberId());

		if (photos.isEmpty()) {
			throw new DataNotFoundException(ErrorCode.PHOTO_NOT_FOUND);
		}

		List<PhotoOverViewDto> photoList = new ArrayList<>();

		int size = photos.size() / 4;
		for (int i = 0; i < size; i++) {
			List<String> fourcut = new ArrayList<>();
			fourcut.add(photos.get(i).getPhotoImg());
			fourcut.add(photos.get(i+1).getPhotoImg());
			fourcut.add(photos.get(i+2).getPhotoImg());
			fourcut.add(photos.get(i+3).getPhotoImg());
			photoList.add(new PhotoOverViewDto( photos.get(i).getFanmeeting().getCreator().getName(), photos.get(i).getFanmeeting().getTitle(), photos.get(i).getFanmeeting().getStartDate(), fourcut));
		}

		return photoList;
	}

}
