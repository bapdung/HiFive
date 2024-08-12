package com.ssafy.hifive.domain.openvidu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduRecordDto {
	private String recordId;

	public static OpenViduRecordDto from(String recordingId) {
		return new OpenViduRecordDto(recordingId);
	}
}
