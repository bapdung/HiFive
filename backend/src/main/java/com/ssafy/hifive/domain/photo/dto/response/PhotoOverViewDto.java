package com.ssafy.hifive.domain.photo.dto.response;

import java.time.LocalDateTime;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;
import com.ssafy.hifive.domain.photo.entity.Photo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PhotoOverViewDto {
	private String creatorName;
	private String title;
	private LocalDateTime fanmeetingStartDate;
	private String photoImg;

	public static PhotoOverViewDto from(Photo photo, Fanmeeting fanmeeting) {
		return new PhotoOverViewDto(
			fanmeeting.getCreator().getName(),
			fanmeeting.getTitle(),
			fanmeeting.getStartDate(),
			photo.getPhotoImg()
		);

	}

}
