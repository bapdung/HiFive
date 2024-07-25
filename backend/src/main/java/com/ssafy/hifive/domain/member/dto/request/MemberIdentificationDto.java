package com.ssafy.hifive.domain.member.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public final class MemberIdentificationDto {
	private MultipartFile identificationImg;

	// public Member toEntity(Member member) {
	// 	return Member.builder()
	// 		.identificationImg(identificationImg)
	// 		.build();
	// }
}
