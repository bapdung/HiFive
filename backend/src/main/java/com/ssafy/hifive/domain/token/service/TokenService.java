package com.ssafy.hifive.domain.token.service;

import java.time.Duration;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.global.config.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService {

	private final TokenProvider tokenProvider;
	private final RefreshTokenService refreshTokenService;
	private final MemberService memberService;

	public String createNewAccessToken(String refreshToken) {

		if (!tokenProvider.validToken(refreshToken)) {
			throw new IllegalArgumentException("Unexpected token");
		}

		Member memberId = refreshTokenService.findByRefreshToken(refreshToken).getMemberId();
		Member member = memberService.findById(memberId);
		return tokenProvider.generateToken(member, Duration.ofHours(1));
	}
}
