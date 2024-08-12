package com.ssafy.hifive.domain.openvidu.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenViduCheckDto {
	private long memberId;
	private long fanmeetingId;
}
