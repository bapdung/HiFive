package com.ssafy.hifive.domain.photo.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PhotoOverViewDto {
	private String creatorName;
	private String title;
	private Long fanmeetingId;
	private LocalDateTime fanmeetingDate;
	private List<PhotoUrlDto> photoImg;

	public static PhotoOverViewDto from(Fanmeeting fanmeeting, List<PhotoUrlDto> photoImg) {
		return new PhotoOverViewDto(
			fanmeeting.getCreator().getName(),
			fanmeeting.getTitle(),
			fanmeeting.getFanmeetingId(),
			fanmeeting.getStartDate(),
			photoImg
		);
	}
}
