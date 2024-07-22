package com.ssafy.hifive.domain.member.entity;

import java.util.Locale;

public enum OauthServerType {
	KAKAO,
	GOOGLE;

	public static OauthServerType fromName(String type) {
		return OauthServerType.valueOf(type.toUpperCase(Locale.ENGLISH));
	}
}
